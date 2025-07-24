import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/dashboard' }
];
