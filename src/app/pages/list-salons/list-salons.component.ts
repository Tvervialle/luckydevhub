import {Component, OnInit} from '@angular/core';
import {SalonService} from "../../services/salon.service";
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {catchError, combineLatest, map, Observable, of, switchMap} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-list-salons',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './list-salons.component.html',
  styleUrl: './list-salons.component.css'
})
export class ListSalonsComponent implements OnInit {
  salons$!: Observable<any[]>;
  errorMessage: string = '';

  constructor(private firestore: AngularFirestore, private salonService: SalonService) {
  }

  ngOnInit(): void {
    this.salons$ = this.firestore.collection('salons').snapshotChanges().pipe(
      switchMap(actions => {
        if (actions.length === 0) {
          throw new Error('Aucun salon trouvé.');
        }

        // Pour chaque salon, récupérer ses données et les utilisateurs connectés
        const salonsWithUsers$ = actions.map(a => {
          const data = a.payload.doc.data() as any;
          const salonId = data.name;

          // Récupérer les utilisateurs connectés pour ce salon
          const connectedUsers$ = this.firestore.collection('salons').doc(salonId).collection('connectedUsers').valueChanges();

          // Combiner les données du salon et les utilisateurs connectés
          return combineLatest([of(data), connectedUsers$]).pipe(
            map(([salonData, connectedUsers]) => {
              const connectedUsersCount = connectedUsers.length; // Compter les utilisateurs connectés
              return {
                salonId,
                ...salonData,
                connectedUsersCount // Ajoute le nombre d'utilisateurs connectés
              };
            })
          );
        });

        // Combiner tous les salons en un seul Observable
        return combineLatest(salonsWithUsers$);
      }),
      catchError(err => {
        this.errorMessage = err.message; // Stocker l'erreur dans une variable pour l'afficher
        console.error('Erreur lors de la récupération des salons :', err);
        return of([]); // Retourner un Observable vide en cas d'erreur
      })
    );
  }


}
