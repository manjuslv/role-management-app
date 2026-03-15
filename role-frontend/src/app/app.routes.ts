import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RolesComponent } from './roles/roles.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  // Default route → redirect to login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Login page → no guard needed
  { path: 'login', component: LoginComponent },

  // Register page → no guard needed
  { path: 'register', component: RegisterComponent },

  // Roles page → protected by authGuard
  { path: 'roles', component: RolesComponent, canActivate: [authGuard] }
];