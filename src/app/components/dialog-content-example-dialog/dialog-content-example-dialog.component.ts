import {Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dialog-content-example-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './dialog-content-example-dialog.component.html',
  styleUrl: './dialog-content-example-dialog.component.css'
})
export class DialogContentExampleDialogComponent implements OnInit {

  user: any;

  constructor(protected auth: AuthService) {
  }

  ngOnInit() {
    // Souscrire à l'état de l'utilisateur et récupérer les infos
    this.auth.getUserInfo().subscribe(user => {
      this.user = user;
    });
  }

  logOut() {
    this.auth.logout();
  }
}
