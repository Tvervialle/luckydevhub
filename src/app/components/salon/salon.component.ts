import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SalonService} from "../../services/salon.service";
import {ChatComponent} from "../chat/chat.component";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-salon',
  standalone: true,
  imports: [
    ChatComponent,
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './salon.component.html',
  styleUrl: './salon.component.css'
})
export class SalonComponent implements OnInit {

  salonId: string | null = null;
  accessValid = false;
  isShareVisible = false;
  connectedUsers$: Observable<any[]> = new Observable<any[]>();

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private salonService: SalonService, private router: Router) {
  }

  ngOnInit(): void {
    window.addEventListener('beforeunload', () => this.salonService.leaveSalon(this.salonId ? this.salonId : '')); // Passe l'ID du salon
    this.salonId = this.route.snapshot.paramMap.get('id');
    this.salonService.deleteExpiredSalons();
    this.salonService.joinSalon(this.salonId ? this.salonId : '').then(r => console.log('Utilisateur ajouté au salon')).catch(e => console.error('Erreur lors de l\'ajout de l\'utilisateur au salon :', e));
    this.getConnectedUsers(this.salonId ? this.salonId : ''); // Passe l'ID du salon
    this.salonService.getSalons().subscribe(salon => {
      this.accessValid = salon.some(s => s.name === this.salonId);
      if (!this.accessValid) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.salonService.leaveSalon(this.salonId ? this.salonId : '');
  }

  getConnectedUsers(salonId: string): void {
    this.connectedUsers$ = this.firestore.collection('salons').doc(salonId)
      .collection('connectedUsers').valueChanges();
  }

  toggleShare(): void {
    this.isShareVisible = !this.isShareVisible;
  }

  copyUrl() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  }
}
