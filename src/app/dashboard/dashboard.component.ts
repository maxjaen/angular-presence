import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Task } from '../core/models/task';
import { Weight } from '../core/models/weight';
import { TimeTask } from '../core/models/timetask';
import { Training } from '../core/models/training';
import { Section } from '../core/models/section';
import { Pattern } from '../core/models/enums';
import { Settings } from '../core/models/settings';
import { Exercise } from '../core/models/exercise';
import { KeyService } from '../core/services/key.service';
import { TaskService } from '../core/services/task.service';
import { WeightService } from '../core/services/weight.service';
import { TrainingService } from '../core/services/training.service';
import { TimeTaskService } from '../core/services/timetask.service';
import { SettingsService } from '../core/services/settings.service';
import { first, last, notEmpty } from '../core/utils/ArrayUtils';
import { formatToHms, isToday } from '../core/utils/TimeUtils';

const SECTION_PLACEHOLDER_VALUE = '_';
const SLASH = '/';

enum SectionType {
    GENERAL = 'general',
    TASK = 'task',
    FITNESS = 'fitness',
}

enum Module {
    TASKS = 'tasks',
    TIME_TASKS = 'timetask',
    SESSIONS = 'session',
    WEIGHTS = 'weight',
}

@Component({
    selector: 'app-dashboard.',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    public sections: Section[];
    public settings: Settings;
    public sectionKeyValuePairs: any[] = [];

    constructor(
        public settingsService: SettingsService,
        private taskService: TaskService,
        private timeTaskService: TimeTaskService,
        private trainingService: TrainingService,
        private weightService: WeightService,
        private title: Title,
        private router: Router,
        private keyService: KeyService
    ) {
        this.title.setTitle(this.keyService.getKeyTranslation('d1'));
    }

    ngOnInit() {
        this.sections = this.keyService.getSections();

        forkJoin([
            this.settingsService.getSettings(),
            this.taskService.getTasks(),
            this.timeTaskService.getTimeTasks(),
            this.trainingService.getTrainings(),
            this.weightService.getAllWeights()
        ]).subscribe((res) => {
            this.initializeSettings(res[0]);
            this.addTaskPlaceholder(res[1]);
            this.addTimeTaskPlaceholder(res[2]);
            this.addSessionPlaceholder(res[3]);
            this.addWeightPlaceholder(res[4]);
        });
    }

    /**
     * Navigates to the specified absolute url of the section.
     *
     * @param section The section that should be navigated to via the UI.
     */
    public goToUrl(section: string) {
        this.router.navigate([SLASH + section]);
    }

    /**
     * Creates the title of the section that will be visible in each sections
     * navigation button.
     * The data could be either dynamic content if the users has added any data
     * there or static content if no data is present.
     *
     * @param section Will extract and display data of the specified section.
     * @returns A string presentation of the section that could contain dynamic
     * content.
     */
    public createSectionTitle(section: Section) {
        if (this.isSectionWithAvailableData(section)) {
            return section.displayText.replace(
                SECTION_PLACEHOLDER_VALUE,
                this.getPlaceHolderValue(section)
            );
        } else if (this.isSectionWithoutPlaceholder(section)) {
            return section.displayText;
        } else {
            return this.keyService.getKeyTranslation('d11');
        }
    }

    /**
     * Checks if a section is of type 'task'.
     */
    public hasTaskType(section: Section): boolean {
        return section.type === SectionType.TASK;
    }

    /**
     * Checks if a section is of type 'fitness'.
     */
    public hasFitnessType(section: Section): boolean {
        return section.type === SectionType.FITNESS;
    }

    /**
     * Checks if a section is of type 'general'.
     */
    public hasGeneralType(section: Section): boolean {
        return section.type === SectionType.GENERAL;
    }

    private initializeSettings(settings: Settings[]) {
        this.settings = first(settings);
    }

    private addWeightPlaceholder(weights: Weight[]) {
        if (notEmpty(weights)) {
            const lastWeight = last(weights);

            this.sectionKeyValuePairs.push({
                name: Module.WEIGHTS,
                value: lastWeight.value,
            });
        }
    }

    private addSessionPlaceholder(trainings: Training[]) {
        if (notEmpty(trainings)) {
            const timeTrainings = trainings.filter((trainingData) => trainingData.exercises.every(
                (exercise) => exercise.category === Pattern.CONDITIONAL1
            )
            );

            const lastTraining = last(timeTrainings);
            // TODO: Where does the 5 come from?
            const value = (
                lastTraining.exercises
                    .map((exercise: Exercise) => +exercise.repetitions)
                    .reduce(
                        (sum: number, current: number) => sum + current,
                        0
                    ) +
                5 * lastTraining.exercises.length
            ).toString();

            this.sectionKeyValuePairs.push({
                name: Module.SESSIONS,
                value,
            });
        }
    }

    private addTimeTaskPlaceholder(timeTasks: TimeTask[]) {
        const value = timeTasks
            .filter(
                (timeTaskData) => isToday(timeTaskData.startDate) &&
                    this.timeTaskService.isValid(timeTaskData)
            )
            .map((validTimeTasks) => this.timeTaskService.extractTimeBetweenStartAndEnd(
                validTimeTasks
            )
            )
            .reduce((a, b) => a + b, 0);

        this.sectionKeyValuePairs.push({
            name: Module.TIME_TASKS,
            value: formatToHms(value),
        });
    }

    private addTaskPlaceholder(tasks: Task[]) {
        const value = tasks.filter((task) => task.pinned).length.toString();

        this.sectionKeyValuePairs.push({
            name: Module.TASKS,
            value,
        });
    }

    private isSectionWithAvailableData(section: Section) {
        return (
            this.sectionKeyValuePairs &&
            section.displayText.includes(SECTION_PLACEHOLDER_VALUE) &&
            this.hasPlaceHolderValue(section)
        );
    }

    private isSectionWithoutPlaceholder(section: Section): boolean {
        return !section.displayText.includes(SECTION_PLACEHOLDER_VALUE);
    }

    private getPlaceHolderValue(section: Section): string {
        return first(
            this.sectionKeyValuePairs.filter(
                (placeholder) => placeholder.name === section.name
            )
        ).value;
    }

    private hasPlaceHolderValue(section: Section): boolean {
        return (
            first(
                this.sectionKeyValuePairs.filter(
                    (placeholder) => placeholder.name === section.name
                )
            ) !== undefined
        );
    }

    private initTaskPlaceholder() {
        this.taskService.getTasks().subscribe((tasks) => {
            const value = tasks.filter((task) => task.pinned).length.toString();

            this.sectionKeyValuePairs.push({
                name: Module.TASKS,
                value,
            });
        });
    }

    private initTimeTaskPlaceholder() {
        this.timeTaskService.getTimeTasks().subscribe((timeTasks) => {
            const value = timeTasks
                .filter(
                    (timeTaskData) =>
                        isToday(timeTaskData.startDate) &&
                        this.timeTaskService.isValid(timeTaskData)
                )
                .map((validTimeTasks) =>
                    this.timeTaskService.extractTimeBetweenStartAndEnd(
                        validTimeTasks
                    )
                )
                .reduce((a, b) => a + b, 0);

            this.sectionKeyValuePairs.push({
                name: Module.TIME_TASKS,
                value: formatToHms(value),
            });
        });
    }

}
