import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { NotificationService } from './services/notification.service';

@NgModule({
    imports: [
        FormsModule,
        MatSnackBarModule,
        MatDialogModule,
        MatSelectModule
    ],
    declarations: [
    ],
    providers: [
        NotificationService,
        AmazingTimePickerService
    ],
})
export class CoreModule { }
