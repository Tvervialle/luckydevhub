import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SalonService} from "../../services/salon.service";
import {ChatComponent} from "../chat/chat.component";

@Component({
  selector: 'app-salon',
  standalone: true,
  imports: [
    ChatComponent
  ],
  templateUrl: './salon.component.html',
  styleUrl: './salon.component.css'
})
export class SalonComponent implements OnInit {

  salonId: string | null = null;
  accessValid: boolean = false;

  constructor(private route: ActivatedRoute, private salonService: SalonService, private router: Router) { }

  ngOnInit(): void {
    this.salonId = this.route.snapshot.paramMap.get('id');
  }

  copyUrl() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  }
}
