import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxTimerModule } from 'ngx-timer';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TimeTaskComponent } from './timetask.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [
        MatTabsModule,
        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        NgxTimerModule,
        NgxChartsModule,
        FormsModule
    ],
    declarations: [
        TimeTaskComponent
    ],
    providers: []
})
export class TimeTaskModule { }
