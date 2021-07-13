import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from '../../core/models/task';
import { TimeTask } from '../../core/models/timetask';
import { TaskService } from '../../core/services/task.service';
import { newDate } from '../../core/utils/TimeUtils';
import { sortNumerical } from '../../core/utils/CommonUtils';

@Component({
  selector: 'app-insert-task-dialog',
  templateUrl: 'insert-task-dialog.html',
})
export class InsertTaskDialogTimeComponent {
  tasks: Task[];

  constructor(
    private taskService: TaskService,
    public dialogRefService: MatDialogRef<InsertTaskDialogTimeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeTask
  ) {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks
        .filter((e) => !e.hided)
        .sort((a, b) =>
          sortNumerical(
            Date.parse(a.date.toString()),
            Date.parse(b.date.toString())
          )
        );

      const shortDescription = 'Not an existing task';
      const longDescription = '';
      const date = newDate();

      tasks.push({
        id: 0,
        shortDescription,
        tempShortDescription: shortDescription,
        longDescription,
        tempLongDescription: longDescription,
        date,
        tempDate: date,
        hided: false,
        pinned: true,
        project: 'Without project',
      });
    });
  }

  public selectCategory(event: { value: Task }) {
    this.data.task = event.value;
    this.data.shortDescription = event.value.shortDescription;
    this.data.longDescription = event.value.longDescription;
    this.data.project = event.value.project;
  }

  public onNoClick(): void {
    this.dialogRefService.close();
  }
}
