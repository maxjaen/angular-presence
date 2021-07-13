import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExerciseOverViewComponent } from './exercises/exercise-overview.component';
import { SessionComponent } from './sessions/session.component';
import { SettingsComponent } from './settings/settings.component';
import { TasksComponent } from './tasks/tasks.component';
import { TimeTaskComponent } from './timetask/timetask.component';
import { WeightComponent } from './weights/weight.component';

// TODO insert to environment
const EMPTY_STRING = '';
const PATH_DASHBOARD = 'dashboard';
const PATH_SETTINGS = 'settings';
const PATH_TASKS = 'tasks';
const PATH_TIME_TASKS = 'timetask';
const PATH_TRAININGS = 'training';
const PATH_EXERCISES = 'exercise';
const PATH_SESSIONS = 'session';
const PATH_WEIGHTS = 'weight';

const routes: Routes = [
    {
        path: EMPTY_STRING,
        redirectTo: PATH_DASHBOARD,
        pathMatch: 'full',
    },
    {
        path: PATH_DASHBOARD,
        component: DashboardComponent,
        loadChildren: () => import('./dashboard/dashboard.module')
            .then(m => m.DashboardModule)
    },
    {
        path: PATH_SETTINGS,
        component: SettingsComponent,
        loadChildren: () => import('./settings/settings.module')
            .then(m => m.SettingsModule)
    },
    {
        path: PATH_TASKS,
        component: TasksComponent,
        loadChildren: () => import('./tasks/tasks.module')
            .then(m => m.TasksModule)
    },
    {
        path: PATH_TIME_TASKS,
        component: TimeTaskComponent,
        loadChildren: () => import('./timetask/timetask.module')
            .then(m => m.TimeTaskModule)
    },
    {
        path: PATH_TRAININGS,
        loadChildren: () => import('./trainings/trainings.module')
            .then(m => m.TrainingsOverviewModule)
    },
    {
        path: PATH_EXERCISES,
        component: ExerciseOverViewComponent,
        loadChildren: () => import('./exercises/exercise.module')
            .then(m => m.ExerciseModule)
    },
    {
        path: PATH_SESSIONS,
        component: SessionComponent,
        loadChildren: () => import('./sessions/sessions.module')
            .then(m => m.SessionModule)
    },
    {
        path: PATH_WEIGHTS,
        component: WeightComponent,
        loadChildren: () => import('./weights/weight.module')
            .then(m => m.WeightModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules,
        relativeLinkResolution: 'legacy'
    })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
