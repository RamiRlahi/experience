import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Clipboard } from '@angular/cdk/clipboard';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ClipboardModule,
    HttpClientModule,
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
export class AppComponent implements OnInit, OnDestroy {
  private keycloakService = inject(KeycloakService);
  private clipboard = inject(Clipboard);
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  statusPanel = '';

  constructor() {
    this.keycloakService.keycloakEvents$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (event: any) => { // Using 'any' to handle both legacy and new event types
          // Handle both legacy and new event type formats
          const eventType = event.type || event;
          
          if (eventType.toString().includes('TokenExpired')) {
            this.handleTokenExpired();
          } else if (eventType.toString().includes('AuthLogout')) {
            this.statusPanel = 'User logged out';
          } else if (eventType.toString().includes('AuthRefreshSuccess')) {
            this.statusPanel = 'Session refreshed';
          } else if (eventType.toString().includes('AuthRefreshError')) {
            this.statusPanel = 'Session refresh failed';
          }
        },
        error: (err) => {
          console.error('Keycloak event error:', err);
          this.statusPanel = 'Keycloak event error occurred';
        }
      });
  }

  private handleTokenExpired(): void {
    this.keycloakService.updateToken(20)
      .then(refreshed => {
        this.statusPanel = refreshed 
          ? 'Token was refreshed' 
          : 'Token is still valid';
      })
      .catch(err => {
        this.statusPanel = 'Failed to refresh token';
        console.error('Token refresh error:', err);
      });
  }

  // Rest of your component methods remain the same...
  async ngOnInit(): Promise<void> {
    const loggedIn = await this.keycloakService.isLoggedIn();
    if (
      loggedIn &&
      (this.router.url === '/' ||
        this.router.url === '/login' ||
        this.router.url === '/register')
    ) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
      this.statusPanel = 'Error occurred while copying token';
    });
  }

  public parseAccessToken(): void {
    this.keycloakService.getToken().then(token => {
      this.statusPanel = this.toJWTString(token);
    }).catch(e => {
      this.statusPanel = 'Error occurred while parsing token. Check console.';
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

  public sendHttpRequest(): void {
    this.httpClient.get('https://ab81a40b274c481694de52422e7c28c3.api.mockbin.io/')
      .subscribe({
        next: res => {
          console.log(res);
          this.statusPanel = 'HTTP request succeeded. Check console.';
        },
        error: err => {
          console.error(err);
          this.statusPanel = 'HTTP request failed. See console.';
        }
      });
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