import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import {provideClientHydration} from "@angular/platform-browser";
import {routes} from "./app.routes";
import {provideRouter} from "@angular/router";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";

let environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAFZuby_kdvBmVOE5bay1bMy18VPHF5eoU',
    authDomain: 'luckystarkdevhub.firebaseapp.com',
    projectId: 'luckystarkdevhub',
    storageBucket: 'luckystarkdevhub.appspot.com',
    messagingSenderId: '857735588958',
    appId: '1:857735588958:web:950696e8c3002cdfca18cf',
    measurementId: 'G-3MXDTG5J7G'
  }
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({"projectId":"luckystarkdevhub","appId":"1:857735588958:web:950696e8c3002cdfca18cf","databaseURL":"https://luckystarkdevhub-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"luckystarkdevhub.appspot.com","apiKey":"AIzaSyAFZuby_kdvBmVOE5bay1bMy18VPHF5eoU","authDomain":"luckystarkdevhub.firebaseapp.com","messagingSenderId":"857735588958","measurementId":"G-3MXDTG5J7G"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
};

