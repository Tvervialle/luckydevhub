import {Component} from '@angular/core';
import {SalonService} from "../../services/salon.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatInput} from "@angular/material/input";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-poker',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatInput,
    MatFormField,
    NgIf
  ],
  templateUrl: './poker.component.html',
  styleUrl: './poker.component.css'
})
export class PokerComponent {
  salonName = '';
  errorMessage: string = ''; // Pour afficher les erreurs dans l'UI


  constructor(private salonService: SalonService, private router: Router, private firestore: AngularFirestore) {
  }

  // Crée un salon temporaire de 10 minutes
  salonId = '';

  async createSalon(): Promise<void> {
    if (!this.salonName) {
      alert('Veuillez entrer un nom de salon');
      return;
    }
    try {
      this.salonService.getSalons().subscribe(salon => {
        const s = salon.find(s => s.name === this.salonName);
        if (s) {
          this.errorMessage = `Le salon "${this.salonName}" existe déjà. Choisissez un autre nom fdp.`;
        } else {
          const salonData = {name: this.salonName, createdAt: new Date()};
          this.salonService.createSalon(salonData)
            .then(salonId => console.log('Salon créé avec ID:', salonId))
            .catch(error => console.error('Erreur lors de la création du salon', error));
          this.router.navigate(['/salon', salonData.name]); // Redirige vers le salon
        }
      });
    } catch (error) {
      console.error('Erreur lors de la création du salon :', error);
      this.errorMessage = 'Erreur lors de la création du salon. Veuillez réessayer.';
    }
  }
}

