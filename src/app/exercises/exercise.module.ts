import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ExerciseOverViewComponent } from './exercise-overview.component';
import { ExerciseDetailviewComponent } from './components/exercise-detailview/exercise-detailview.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        ReactiveFormsModule,
        NgxChartsModule,
        MatInputModule
    ],
    declarations: [
        ExerciseOverViewComponent,
        ExerciseDetailviewComponent
    ],
    providers: []
})
export class ExerciseModule { }
