import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TrainingOverViewComponent } from './training-overview.component';
import { TrainingDetailViewComponent } from './components/training-detailview/training-detailview.component';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatCardModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        MatOptionModule,
        MatTableModule,
        ReactiveFormsModule,
        CommonModule,
        TrainingRoutingModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    declarations: [
        TrainingOverViewComponent,
        TrainingDetailViewComponent
    ],
    providers: [
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class TrainingsOverviewModule { }
