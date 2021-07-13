import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingDetailViewComponent } from './components/training-detailview/training-detailview.component';
import { TrainingOverViewComponent } from './training-overview.component';

const routes: Routes = [
    {
        path: '',
        component: TrainingOverViewComponent
    },
    {
        path: ':id',
        component: TrainingDetailViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrainingRoutingModule { }
