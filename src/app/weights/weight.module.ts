import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { WeightComponent } from './weight.component';

@NgModule({
    imports: [
      ReactiveFormsModule,
      NgxChartsModule,
      MatMenuModule,
      MatIconModule,
      MatDatepickerModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule
  ],
  declarations: [
    WeightComponent
  ],
  providers: []
})
export class WeightModule {}
