import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatInput} from "@angular/material/input";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    AsyncPipe,
    MatButton,
    MatInput,
    MatFormField
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  newAdmin = {name: '', email: ''};
  adminList: any;

  constructor(private admin: AdminService) {
  }


  ngOnInit() {
    this.getAdmins();
    console.log('AdminComponent', this.adminList);
  }

  // Ajouter un administrateur
  addAdmin() {
    this.admin.addAdmin(this.newAdmin.email, this.newAdmin.name, false);
  }

  getAdmins() {
    this.admin.getAdmins().subscribe(admins => {
        this.adminList = admins;
        console.log('adminList', this.adminList);

      }
    );
  }


  // Modifier un administrateur
  editAdmin(index: number) {
    this.adminList[index].editMode = true;
  }

  // Sauvegarder les modifications
  saveAdmin(index: number) {
    this.admin.updateAdmin( this.adminList[index].id, this.adminList[index].name, this.adminList[index].email);
    this.adminList[index].editMode = false;

  }

  // Supprimer un administrateur
  deleteAdmin(index: number) {
    console.log(index, this.adminList[index]);
    this.admin.removeAdmin(this.adminList[index].id);
  }
}
