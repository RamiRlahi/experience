import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ClipboardModule],
  template: `
    <div *ngIf="!isLoggedIn.value; else loggedIn">
      <button (click)="login()">Login</button>
    </div>
    <ng-template #loggedIn>
      <p>Welcome!</p>
      <button (click)="logout()">Logout</button>
    </ng-template>
    <div class="status-panel">{{ statusPanel }}</div>
  `,
  styles: [`
    .app-container { min-height: 100vh; }
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

  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public statusPanel = '';

  constructor() {
    this.keycloakService.keycloakEvents$
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        const eventType = event.type as unknown as string;
        switch (eventType) {
          case 'OnTokenExpired':
            this.handleTokenExpired();
            break;
          case 'OnAuthLogout':
            this.statusPanel = 'User logged out';
            this.isLoggedIn.next(false);
            break;
          case 'OnAuthRefreshSuccess':
            this.statusPanel = 'Session refreshed';
            break;
          case 'OnAuthRefreshError':
            this.statusPanel = 'Session refresh failed';
            break;
        }
      });
  }

  async ngOnInit(): Promise<void> {
    const loggedIn = await this.keycloakService.isLoggedIn();
    this.isLoggedIn.next(loggedIn);

    if (loggedIn && ['/', '/login', '/register'].includes(this.router.url)) {
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

  public async checkLoginStatus(): Promise<void> {
    const loggedIn = await this.keycloakService.isLoggedIn();
    this.statusPanel = 'Is Logged In: ' + loggedIn;
    this.isLoggedIn.next(loggedIn);
  }

  public copyAccessTokenToClipboard(): void {
    this.keycloakService.getToken().then(token => {
      this.clipboard.copy(token);
      this.statusPanel = 'Copied the token to clipboard';
    }).catch(e => {
      this.statusPanel = 'Error occurred while copying token';
      console.error(e);
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

  public async isTokenExpired(): Promise<void> {
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

  public async showRoles(): Promise<void> {
    const roles = await this.keycloakService.getUserRoles();
    this.statusPanel = roles.length > 0 ? roles.join(', ') : 'No roles found.';
  }

  public resetPanel(): void {
    this.statusPanel = '';
  }

  private handleTokenExpired(): void {
    this.keycloakService.updateToken(20)
      .then(refreshed => {
        this.statusPanel = refreshed ? 'Token was refreshed' : 'Token is still valid';
      })
      .catch(err => {
        this.statusPanel = 'Failed to refresh token';
        console.error('Token refresh error:', err);
      });
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
