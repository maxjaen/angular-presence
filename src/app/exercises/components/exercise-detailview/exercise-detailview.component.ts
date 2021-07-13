import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pattern } from '../../../core/models/enums';
import { Exercise } from '../../../core/models/exercise';
import { Training } from '../../../core/models/training';
import { NumberValueGraph } from '../../../core/models/graphData';
import { TrainingService } from '../../../core/services/training.service';
import { GraphDataService } from '../../../core/services/graph.service';
import { PatternAnalysisService } from '../../../core/services/pattern-analysis.service';

@Component({
    selector: 'app-exercise-detailview',
    templateUrl: './exercise-detailview.component.html',
    styleUrls: ['./exercise-detailview.component.scss'],
})
export class ExerciseDetailviewComponent implements OnChanges {

    @Input() exercise: Exercise;

    public trainings: Training[];
    public graphData: NumberValueGraph[] = [];
    public graphDataPercent: NumberValueGraph[] = [];

    Pattern = Pattern;

    constructor(
        public trainingService: TrainingService,
        public patternAnalysisService: PatternAnalysisService,
        private graphDataService: GraphDataService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes.firstChange) {
            this.initDetailedData();
        }
    }

    private initDetailedData() {
        this.trainingService.getTrainings().subscribe((trainings) => {
            if (this.exercise) {
                this.initTrainings(trainings);
                this.initNumericalGraph();
                this.initPercentageGraph();
            }
        });
    }

    private initTrainings(trainings: Training[]) {
        this.trainings = this.trainingService.retrieveTrainingsFromExercise(
            trainings,
            this.exercise
        );
    }

    private initNumericalGraph() {
        this.graphData = this.graphDataService.initGraphDataForExerciseProgress(
            this.trainings,
            this.exercise
        );
    }

    private initPercentageGraph() {
        this.graphDataPercent = this.calculateGraphDataPercent();
    }

    /**
     * Calculates the difference between one training and the training before
     * as percentage to determine highs and lows for each exercise.
     */
    private calculateGraphDataPercent() {
        const graphData = this.graphData;
        const graphDataPercent = [];

        graphData.forEach((currentElem, i) => {
            const lastElem = graphData[i + 1];
            const endOfArray = graphData[graphData.length - 1];

            if (currentElem !== endOfArray) {
                const entry: NumberValueGraph = {
                    name: 'From ' + lastElem.name + ' to ' + currentElem.name,
                    value:
                        ((+currentElem.value - +lastElem.value) /
                            +currentElem.value) *
                        100,
                };
                graphDataPercent.push(entry);
            }
        });

        return graphDataPercent;
    }
}
