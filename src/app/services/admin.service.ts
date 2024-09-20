import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable, Subscription} from "rxjs";
import {AuthService} from "./auth.service";
import {collection, doc, getDocs} from "@angular/fire/firestore";


interface Admin {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminList$: Observable<Admin[]> | null = null; // Initialisé à null
  email = '';

  constructor(private firestore: AngularFirestore) {
  }


  isAdminExist(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const email = localStorage.getItem('email') ?? '';

      this.firestore.collection('admins').valueChanges().subscribe({
        next: (admins) => {
          let isAdmin = false;
          admins.forEach((admin: any) => {
            console.log('admin', admin.email);
            console.log('email',email );
            console.log('result', admin.email ==email)
            if (admin.email == email) {
              isAdmin = true;
            }
          });
          resolve(isAdmin);  // Résoudre la Promise avec la valeur de isAdmin
        },
        error: (error) => {
          console.error('Error fetching admins', error);
          reject(error);  // Rejeter la Promise en cas d'erreur
        }
      });
    });
  }



  getAdmins() {
    return this.adminList$ = this.firestore
      .collection<Admin>('admins') // nom de la collection dans Firestore
      .valueChanges({idField: 'id'}); // Inclure l'ID du document
  }

  // Fonction pour ajouter un administrateur
  addAdmin(email: string, name: string, editMode: boolean): void {
    this.firestore.collection('admins').add({
      name: name,
      email: email,
      editMode: editMode
    });
  }

  updateAdmin(id: string, name: string, email: string): void {
    this.firestore.collection('admins').doc(id).update({
      name: name,
      email: email
    });
  }

  // Fonction pour supprimer un administrateur
  removeAdmin(id: string): void {
    this.firestore.collection('admins').doc(id).delete().then(r => console.log('Admin supprimé')).catch(e => console.error('Erreur lors de la suppression de l\'admin :', e));
  }


}
