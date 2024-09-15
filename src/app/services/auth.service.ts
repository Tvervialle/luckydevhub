import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {GoogleAuthProvider} from '@angular/fire/auth'
import {Router} from '@angular/router';
import {EMPTY, Observable} from "rxjs";
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  user$: Observable<any> = EMPTY;  // Initialisation avec un Observable vide

  constructor(private fireauth: AngularFireAuth, private router: Router) {
    this.user$ = this.fireauth.authState;

  }

  isAlreadyAuthenticated() {
    if (localStorage.getItem('token')) {
      this.isAuthenticated = true;
      this.router.navigate(['/dashboard']);
    }
  }

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');

      if (res.user?.emailVerified == true) {
        this.isAuthenticated = true;

        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['/varify-email']);
      }

    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  isAuth(): string | null {
    return localStorage.getItem('token');
  }

  // register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  getUserInfo(): Observable<any> {
    // Retourne un observable contenant l'état de l'authentification
    console.log('getUserInfo()', this.user$);
    return this.user$;
  }

  // sign out
  logout() {
    this.fireauth.signOut().then(() => {
      this.isAuthenticated = false;

      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  // forgot password
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/varify-email']);
    }, err => {
      alert('Something went wrong');
    })
  }

  // email varification
  sendEmailForVarification(user: any) {
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/varify-email']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.isAuthenticated = true;
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }

  async getCurrentUser() {
    return this.fireauth.currentUser;
  }
}
