import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ChatComponent} from "../chat/chat.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ChatComponent,MatButtonModule, MatDividerModule, MatIconModule,MatProgressSpinnerModule, MatMenuModule,
  ],
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {



  constructor(protected auth: AuthService) {
  }


  ngOnInit(): void {
  }

  logOut() {
    this.auth.logout();
  }

  alertinfo() {
    alert('This is a test alert')
  }

  alertinfocouille() {
    alert('mange tes morts')
  }
}
