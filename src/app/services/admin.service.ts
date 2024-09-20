import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable, Subscription} from "rxjs";
import {AuthService} from "./auth.service";


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

  constructor(private firestore: AngularFirestore,private auth: AuthService) {
  }


  isAdminExist(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.firestore.collection('admins').valueChanges().subscribe({
        next: (admins) => {
          let isAdmin = false;
          admins.forEach((admin: any) => {
            if (admin.email === email) {
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

  async isAdmin() {
    console.log('isAdmin called');
    return await this.isAdminExist(localStorage.getItem('email')??'');
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
