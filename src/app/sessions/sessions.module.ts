import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { SessionComponent } from './session.component';

@NgModule({
    imports: [
        CommonModule,
        MatOptionModule,
        MatSelectModule,
        MatIconModule,
        MatFormFieldModule,
    ],
    declarations: [
        SessionComponent
    ],
    providers: []
})
export class SessionModule { }
