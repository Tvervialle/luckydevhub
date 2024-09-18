import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SalonService} from "../../services/salon.service";
import {ChatComponent} from "../chat/chat.component";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthService} from "../../services/auth.service";

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
export class SalonComponent implements OnInit, OnDestroy {

  salonId: string | null = null;
  accessValid = false;
  isShareVisible = false;
  connectedUsers$: Observable<any[]> = new Observable<any[]>();
  private userId: any;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private salonService: SalonService, private router: Router,private afAuth: AngularFireAuth, private auth: AuthService) {
  }

  ngOnInit(): void {
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
    this.auth.getUserInfo().subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    }
    );
    // Supprime l'utilisateur lorsqu'il se déconnecte
    this.afAuth.onAuthStateChanged(user => {
      if (!user && this.userId && this.salonId) {
        this.removeUserFromSalon(this.userId, this.salonId);
      }
    });
    // Stocker une clé dans le sessionStorage au chargement de la page
    sessionStorage.setItem('isRefreshed', 'true');

    // Ajouter l'événement beforeunload
    window.addEventListener('beforeunload', this.leaveSalonOnUnload.bind(this));
  }

  @HostListener('window:beforeunload', ['$event'])
  leaveSalonOnUnload(event: any): void {
    // Si la clé existe dans le sessionStorage, c'est un refresh
    if (sessionStorage.getItem('isRefreshed')) {
      console.log('Page rechargée');
      // Action spécifique en cas de refresh
    } else {
      console.log('Fermeture de l\'onglet ou de la fenêtre');
      // Action spécifique en cas de fermeture de l'onglet ou de la fenêtre
      this.salonService.leaveSalon(this.salonId ? this.salonId : '');
    }
  }

  ngOnDestroy(): void {
    // Supprimer l'événement beforeunload pour éviter les fuites de mémoire
    window.removeEventListener('beforeunload', this.leaveSalonOnUnload.bind(this));

    // Supprimer la clé du sessionStorage lors de la destruction du composant
    sessionStorage.removeItem('isRefreshed');

    // Action spécifique lors de la destruction du composant (quitter le salon)
    this.salonService.leaveSalon(this.salonId ? this.salonId : '');
  }


  private removeUserFromSalon(userId: string, salonId: string): void {
    this.firestore.collection('salons').doc(salonId).collection('connectedUsers').doc(userId).delete()
      .then(() => {
        console.log('Utilisateur supprimé du salon.');
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l\'utilisateur du salon :', error);
      });
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
