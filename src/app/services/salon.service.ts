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
