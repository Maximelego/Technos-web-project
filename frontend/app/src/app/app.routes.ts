import { Routes } from '@angular/router';
import { TimetableComponent } from './timetable/timetable.component';

export const routes: Routes = [
    //{path: '', redirectTo: 'timetable', pathMatch: 'full'},
    {path: 'timetable', component: TimetableComponent},
];
