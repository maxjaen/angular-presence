import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavComponent } from './nav.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        LayoutModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
    ],
    exports: [
        NavComponent
    ],
    declarations: [
        NavComponent
    ],
    providers: []
})
export class NavbarModule { }
