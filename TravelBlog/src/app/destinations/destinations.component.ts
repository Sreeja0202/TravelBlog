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

  onClickDesert() {
    this.router.navigate(['/deserts']);
  }

  logoutUser() {
    this.router.navigate(['/landing']);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }

  onClickValleys() {
    this.router.navigate(['/valleys']);
  }

  onClickMountains() {
    this.router.navigate(['/mountains']);
  }

  onClickSeas() {
    this.router.navigate(['/seas']);
  }
}
