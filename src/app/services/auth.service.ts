import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {GoogleAuthProvider} from '@angular/fire/auth'
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private fireauth: AngularFireAuth, private router: Router) {
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

  isAuth(): boolean {
    return this.isAuthenticated;
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

}
