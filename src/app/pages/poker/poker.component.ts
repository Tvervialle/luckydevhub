import {Component, OnInit} from '@angular/core';
import {SalonService} from "../../services/salon.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {AdminService} from "../../services/admin.service";

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
export class PokerComponent implements OnInit {
  salonName = '';
  errorMessage: string = ''; // Pour afficher les erreurs dans l'UI
  isAdminAthorized = false;

  constructor(private salonService: SalonService, private router: Router, protected admin: AdminService) {
  }

  async ngOnInit() {
    this.isAdminAthorized = await this.admin.isAdmin()

  }

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

