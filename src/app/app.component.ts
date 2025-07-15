import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { KeycloakAngularModule, KeycloakService, KeycloakEventType } from 'keycloak-angular';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatGridListModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    ClipboardModule,
    HttpClientModule
  ],
  template: `
    <div class="app-container">
      <router-outlet></router-outlet>
      <div class="status-panel" *ngIf="statusPanel">{{ statusPanel }}</div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
    }
    .status-panel {
      margin: 1rem;
      padding: 1rem;
      background-color: #f1f1f1;
      border-left: 5px solid #3f51b5;
      font-family: monospace;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'keycloak-angular-example';
  statusPanel: string = '';

  constructor(
    public keycloakService: KeycloakService,
    private clipboard: Clipboard,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.keycloakService.keycloakEvents$.subscribe({
      next: (event) => {
        if (event.type === KeycloakEventType.OnTokenExpired) {
          this.keycloakService.updateToken(20);
        }
      }
    });
  }

  ngOnInit(): void {
    this.keycloakService.isLoggedIn().then((loggedIn) => {
      if (loggedIn && (this.router.url === '/' || this.router.url === '/login' || this.router.url === '/register')) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  public login(): void {
    this.keycloakService.login();
  }

  public logout(): void {
    this.keycloakService.logout(window.location.origin);
  }

  public async isLoggedIn(): Promise<void> {
    const loggedIn = await this.keycloakService.isLoggedIn();
    this.statusPanel = 'Is Logged In: ' + loggedIn;
  }

  public copyAccessTokenToClipboard(): void {
    this.keycloakService.getToken().then(token => {
      this.clipboard.copy(token);
      this.statusPanel = 'Copied the token to clipboard';
    }).catch(() => {
      this.statusPanel = 'Error occurred while copying';
    });
  }

  public parseAccessToken(): void {
    this.keycloakService.getToken().then(token => {
      this.statusPanel = this.toJWTString(token);
    }).catch(e => {
      this.statusPanel = 'Error occurred while parsing. Check console logs.';
      console.error(e);
    });
  }

  public isTokenExpired(): void {
    const expired = this.keycloakService.isTokenExpired(10);
    this.statusPanel = 'Token expired: ' + expired;
  }

  public async updateToken(): Promise<void> {
    try {
      const refreshed = await this.keycloakService.updateToken(5);
      this.statusPanel = refreshed ? 'Token was refreshed' : 'Token is still valid';
    } catch (error) {
      this.statusPanel = 'Failed to refresh token. See console.';
      console.error(error);
    }
  }

  public async sendHttpRequest(): Promise<void> {
    this.httpClient.get('https://ab81a40b274c481694de52422e7c28c3.api.mockbin.io/')
      .subscribe(res => {
        console.log(res);
      });
    this.statusPanel = "HTTP Request Sent. Check browser's network tab.";
  }

  public showRoles(): void {
    const roles = this.keycloakService.getUserRoles();
    this.statusPanel = roles.length > 0 ? roles.join(', ') : 'No roles found.';
  }

  public resetPanel(): void {
    this.statusPanel = '';
  }

  private toJWTString(token: string): string {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return jsonPayload;
  }
}
