import {Component, inject} from '@angular/core';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogContentExampleDialogComponent
} from "../../dialog-content-example-dialog/dialog-content-example-dialog.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatMenu,
    MatToolbar,
    MatToolbarModule, MatButtonModule, MatIconModule, MatMenu, MatMenuTrigger, NgOptimizedImage
  ],

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(protected auth: AuthService, private router: Router) {
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logOut() {
    this.auth.logout();
  }

  alertinfo() {
    alert('This is a test alert')
  }

  alertinfocouille() {
    alert('mange tes morts')
  }

  goPoker() {
    this.router.navigate(['/poker']);
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goListSalons() {
    this.router.navigate(['/list-salons']);
  }

  goAdmin() {
    this.router.navigate(['/admin']);
  }
}
