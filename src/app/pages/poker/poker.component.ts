import { Component } from '@angular/core';
import {SalonService} from "../../services/salon.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatInput} from "@angular/material/input";

@Component({
  selector: 'app-poker',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatInput,
    MatFormField
  ],
  templateUrl: './poker.component.html',
  styleUrl: './poker.component.css'
})
export class PokerComponent {
  salonName='';


  constructor(private salonService: SalonService, private router: Router) { }

  // Crée un salon temporaire de 10 minutes
  salonId= '';
  createSalon(): void {
    if (!this.salonName) {
      alert('Veuillez entrer un nom de salon');
      return;
    }
    const salonData = { name: this.salonName, createdAt: new Date() };
    this.salonService.createSalon(salonData)
      .then(salonId => console.log('Salon créé avec ID:', salonId))
      .catch(error => console.error('Erreur lors de la création du salon', error));
    this.router.navigate(['/salon', salonData.name]); // Redirige vers le salon

  }


}
