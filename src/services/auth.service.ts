import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private keycloak: KeycloakService) {}

  getUsername(): string {
    return this.keycloak.getKeycloakInstance().tokenParsed?.preferred_username;
  }

  isLoggedIn(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  logout(): void {
    this.keycloak.logout(window.location.origin);
  }
}
