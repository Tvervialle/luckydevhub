import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenu, MatMenuTrigger],
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {



  constructor(private router: Router) {
  }


  ngOnInit(): void {
  }




}
