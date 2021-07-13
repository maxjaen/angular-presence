import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SettingsComponent } from './settings.component';

@NgModule({
    imports: [
        CommonModule,
        MatSlideToggleModule,
    ],
    declarations: [
        SettingsComponent
    ],
    providers: []
})
export class SettingsModule { }
