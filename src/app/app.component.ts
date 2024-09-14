import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {VarifyEmailComponent} from "./components/varify-email/varify-email.component";
import {RegisterComponent} from "./components/register/register.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HeaderComponent} from "./components/header/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, DashboardComponent, RegisterComponent, VarifyEmailComponent, ForgotPasswordComponent, HeaderComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
