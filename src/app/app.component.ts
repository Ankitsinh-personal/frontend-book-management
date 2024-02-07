import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-management';
  isSidenavOpen = true;
  isLoggedIn = true;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private _router: Router, private _authService: AuthService) {
    this._router.events.subscribe((event) => {
      this.isLoggedIn = !this._router.url.includes('/login');
    });
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.sidenav.toggle();
  }

  logout() {
    this._authService.logout();
    this._router.navigate([''])
  }
}
