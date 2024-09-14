import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  private salons: { [id: string]: { expiration: Date } } = {}; // Simule une base de données en mémoire

  constructor(private firestore: AngularFirestore) {}

  getSalons(): Observable<any[]> {
    return this.firestore.collection('salons').valueChanges();
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
