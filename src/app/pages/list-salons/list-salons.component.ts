import {Component, OnInit} from '@angular/core';
import {SalonService} from "../../services/salon.service";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-list-salons',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './list-salons.component.html',
  styleUrl: './list-salons.component.css'
})
export class ListSalonsComponent implements OnInit {
  salons: any[] = [];

  constructor(private salonService: SalonService) {}

  ngOnInit(): void {
    this.salonService.deleteExpiredSalons();
    this.salonService.getSalons().subscribe(data => {
      this.salons = data;
    });
  }
}
