import { Component } from '@angular/core';
import { keycloak } from '../services/keycloak.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Welcome, {{ username }}</h1>
    <button (click)="logout()">Logout</button>
  `
})
export class AppComponent {
  username = '';

  constructor() {
    if (keycloak.authenticated && keycloak.tokenParsed) {
      this.username = keycloak.tokenParsed['preferred_username'];
    }
  }

  logout() {
    keycloak.logout();
  }
}
