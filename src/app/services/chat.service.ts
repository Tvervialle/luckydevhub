import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: AngularFirestore) {}

  getMessages(): Observable<any[]> {
    return this.firestore.collection('messages', ref => ref.orderBy('timestamp')).valueChanges();
  }

  sendMessage(content: string): void {
    this.firestore.collection('messages').add({
      content: content,
      timestamp: new Date()
    });
  }
}
