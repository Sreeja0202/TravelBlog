import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css'],
})
export class DestinationsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logoutUser() {
    this.router.navigate(['/landing']);
  }
}
