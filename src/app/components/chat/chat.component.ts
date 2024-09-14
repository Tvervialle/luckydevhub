import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import { Timestamp } from '@angular/fire/firestore';
import {ActivatedRoute} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip"; // Assure-toi d'importer Timestamp si tu l'utilises

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgForOf,
    DatePipe,
    MatTooltip
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {

  messages$: Observable<any[]>;
  messageForm: FormGroup;
  user: any;
  salonId: any;
  @ViewChild('chatContainer') private chatContainer?: ElementRef;
  isChatVisible = false;

  toggleChat(): void {
    this.isChatVisible = !this.isChatVisible;
  }
  constructor(private route: ActivatedRoute,private firestore: AngularFirestore, private fb: FormBuilder, private auth: AuthService) {
    this.salonId = this.route.snapshot.paramMap.get('id');
    this.messages$ = firestore.collection('messages'+this.salonId, ref => ref.orderBy('timestamp')).valueChanges();
    this.messageForm = this.fb.group({
      message: ['']
    });
  }


  ngOnInit(): void {
    this.auth.getUserInfo().subscribe(user => {
      this.user = user;
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.chatContainer) {
      const container = this.chatContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }
  sendMessage(): void {
    const message = this.messageForm.get('message')?.value;
    if (message) {
      this.firestore.collection('messages'+this.salonId).add({
        user: this.user.email,
        content: message,
        timestamp: new Date()
      });
      this.messageForm.reset();
      this.scrollToBottom();
    }
  }

  getDateHeure(timestamp: any): string {
    // Convertit le Timestamp en objet Date si nécessaire
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);

    // Options de formatage pour afficher le jour, le mois et l'heure
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit', // Utilise 'long' pour le nom complet du mois, 'short' pour l'abréviation
      hour: '2-digit',
      minute: '2-digit'
    };

    return date.toLocaleString('fr-FR', options); // 'fr-FR' pour le format français, change si nécessaire
  }

  getUsernameFromEmail(email: string): string {
    if (email.includes('@')) {
      return email.split('@')[0];
    }
    return email; // Retourne l'email complet s'il ne contient pas '@'
  }
}
