import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  private salons: { [id: string]: { expiration: Date } } = {}; // Simule une base de données en mémoire

  constructor(private firestore: AngularFirestore, private authService: AuthService, private auth: AngularFireAuth) {
  }

  getSalons(): Observable<any[]> {
    return this.firestore.collection('salons').valueChanges();
  }

  async joinSalon(salonId: string): Promise<void> {
    const user = this.auth.currentUser;

    user.then(async (user) => {
        if (!user) {
          console.error('Utilisateur non connecté');
          return;
        }
        const userEmail = user.email;
        if (typeof userEmail === "string") {
          console.log('Nom d\'utilisateur:', userEmail.valueOf());
        }

        this.firestore.collection('salons').doc(salonId).collection('connectedUsers').doc(await user.uid).set({
          userName: userEmail,
          joinedAt: new Date()
        })
          .then(() => console.log(`${userEmail} a rejoint le salon`))
          .catch(error => console.error('Erreur lors de l\'ajout de l\'utilisateur connecté :', error));
      }
    );
  }

  leaveSalon(salonId: string): void {
    const user = this.auth.currentUser;
    user.then(async (user) => {
        if (!user) {
          console.error('Utilisateur non connecté');
          return;
        }
        this.firestore.collection('salons').doc(salonId).collection('connectedUsers').doc(await user.uid).delete()
          .then(() => console.log('Utilisateur déconnecté'))
          .catch(error => console.error('Erreur lors de la déconnexion de l\'utilisateur :', error));
      }
    );
  }

  deleteExpiredSalons(): void {
    const now = new Date();
    const thirtyMinutesAgo = new Date(now.getTime() - 120 * 60 * 1000); // Date d'il y a 2 heures

    this.firestore.collection('salons', ref => ref.where('createdAt', '<=', thirtyMinutesAgo)).get().subscribe(snapshot => {
      snapshot.forEach(doc => {
        this.firestore.collection('salons').doc(doc.id).delete()
          .then(() => console.log(`Salon ${doc.id} supprimé car expiré`))
          .catch(error => console.error('Erreur lors de la suppression du salon :', error));
      });
    });
  }

  createSalon(salonData: any): Promise<any> {
    return this.firestore.collection('salons').add(salonData)
      .then(docRef => {
        console.log('Salon créé avec ID:', docRef.id);
        return docRef.id;
      })
      .catch(error => {
        console.error('Erreur lors de la création du salon', error);
        throw error;
      });
  }
}
