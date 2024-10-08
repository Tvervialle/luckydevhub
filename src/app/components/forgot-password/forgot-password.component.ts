import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  forgotPassword() {
    this.auth.forgotPassword(this.email);
    this.email = '';
  }

}
