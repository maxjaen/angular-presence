import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxTimerModule } from 'ngx-timer';
import { TasksComponent } from './tasks.component';
import { ProjectViewComponent } from './views/project-view/project-view.component';
import { PinViewComponent } from './views/pin-view/pin-view.component';
import { InsertTaskDialogComponent } from './dialogs/insert-task-dialog';
import { InsertTaskDialogTimeComponent } from '../timetask/dialogs/insert-task-dialog';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    NgxTimerModule,
    DragDropModule,
],
  declarations: [
    TasksComponent,
    ProjectViewComponent,
    PinViewComponent,
    InsertTaskDialogComponent,
    InsertTaskDialogTimeComponent,
  ],
  providers: [],
  entryComponents: [InsertTaskDialogComponent, InsertTaskDialogTimeComponent],
})
export class TasksModule {}
