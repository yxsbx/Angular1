import { Routes } from '@angular/router';
import { DashboardComponent } from '@app/pages/dashboard/dashboard.component';
import { RoutineComponent } from '@app/pages/routine/routine.component';
import { AuthGuard } from '@app/services/auth';
import { LoginComponent } from '@app/pages/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'routine', component: RoutineComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
