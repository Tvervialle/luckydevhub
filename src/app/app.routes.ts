import {Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {RegisterComponent} from "./components/register/register.component";
import {VarifyEmailComponent} from "./components/varify-email/varify-email.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {AuthGuard} from "./services/auth.guard";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component : DashboardComponent, canActivate: [AuthGuard]},
  {path: 'register', component : RegisterComponent},
  {path: 'varify-email', component : VarifyEmailComponent},
  {path: 'forgot-password', component : ForgotPasswordComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
];
