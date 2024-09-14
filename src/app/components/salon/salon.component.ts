import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SalonService} from "../../services/salon.service";
import {ChatComponent} from "../chat/chat.component";
import {AngularFirestore} from "@angular/fire/compat/firestore";

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
  accessValid = false;
  isShareVisible = false;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private salonService: SalonService, private router: Router) {
  }

  ngOnInit(): void {
    this.salonService.deleteExpiredSalons();

    this.salonId = this.route.snapshot.paramMap.get('id');
    this.salonService.getSalons().subscribe(salon => {
      console.log(salon);
      this.accessValid = salon.some(s => s.name === this.salonId);
      if (!this.accessValid) {
        this.router.navigate(['/']);
      }
    });
  }



  toggleShare(): void {
    this.isShareVisible = !this.isShareVisible;
  }

  copyUrl() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  }
}
