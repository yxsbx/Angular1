import { Routes } from '@angular/router';
import { DashboardComponent } from '@app/pages/dashboard/dashboard.component';
import { RoutineComponent } from '@app/pages/routine/routine.component';
import { CalendarPageComponent } from '@src/app/pages/calendar/calendar-page.component';
import { AuthGuard } from '@app/services/auth/auth.guard';
import { LoginComponent } from '@app/pages/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'routine', component: RoutineComponent, canActivate: [AuthGuard] },
  {
    path: 'calendar',
    component: CalendarPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
