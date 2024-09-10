import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }
}
