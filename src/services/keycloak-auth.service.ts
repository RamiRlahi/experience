import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User, LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthService {
  private readonly API_BASE_URL = 'http://localhost:8080'; // Java backend URL
  private readonly KEYCLOAK_BASE_URL = 'http://localhost:8080'; // Keycloak server URL
  private readonly REALM = 'myrealm';
  private readonly CLIENT_ID = 'angular-client';
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private readonly TOKEN_KEY = 'keycloak_token';
  private readonly REFRESH_TOKEN_KEY = 'keycloak_refresh_token';
  private readonly CURRENT_USER_KEY = 'keycloak_current_user';

  constructor(private http: HttpClient) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const userData = this.getUserData();
    const token = this.getToken();
    
    if (userData && token && !this.isTokenExpired(token)) {
      this.currentUserSubject.next(userData);
    } else if (token && this.isTokenExpired(token)) {
      this.refreshToken().subscribe({
        next: (response) => {
          if (response.success) {
            this.currentUserSubject.next(userData);
          } else {
            this.logout();
          }
        },
        error: () => this.logout()
      });
    }
  }

  login(request: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', this.CLIENT_ID);
    body.set('username', request.email);
    body.set('password', request.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(
      `${this.KEYCLOAK_BASE_URL}/realms/${this.REALM}/protocol/openid-connect/token`,
      body.toString(),
      { headers }
    ).pipe(
      map(response => {
        const user: User = {
          id: this.extractUserId(response.access_token),
          email: request.email,
          name: this.extractUserName(response.access_token),
          createdAt: new Date()
        };

        this.setToken(response.access_token);
        this.setRefreshToken(response.refresh_token);
        this.setUserData(user);
        this.currentUserSubject.next(user);

        return {
          success: true,
          data: {
            token: response.access_token,
            user: user,
            expiresIn: response.expires_in
          }
        };
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of({
          success: false,
          message: 'Invalid credentials or server error',
          data: {} as AuthResponse
        });
      })
    );
  }

  logout(): void {
    const refreshToken = this.getRefreshToken();
    
    if (refreshToken) {
      // Logout from Keycloak
      const body = new URLSearchParams();
      body.set('client_id', this.CLIENT_ID);
      body.set('refresh_token', refreshToken);

      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      this.http.post(
        `${this.KEYCLOAK_BASE_URL}/realms/${this.REALM}/protocol/openid-connect/logout`,
        body.toString(),
        { headers }
      ).subscribe({
        error: (error) => console.error('Logout error:', error)
      });
    }

    this.clearAuthData();
    this.currentUserSubject.next(null);
  }

  refreshToken(): Observable<ApiResponse<AuthResponse>> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('client_id', this.CLIENT_ID);
    body.set('refresh_token', refreshToken);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(
      `${this.KEYCLOAK_BASE_URL}/realms/${this.REALM}/protocol/openid-connect/token`,
      body.toString(),
      { headers }
    ).pipe(
      map(response => {
        const user = this.getUserData();
        this.setToken(response.access_token);
        this.setRefreshToken(response.refresh_token);
        
        return {
          success: true,
          data: {
            token: response.access_token,
            user: user || {
              id: this.extractUserId(response.access_token),
              email: '',
              name: this.extractUserName(response.access_token),
              createdAt: new Date()
            },
            expiresIn: response.expires_in
          }
        };
      }),
      catchError(error => {
        console.error('Token refresh error:', error);
        this.logout();
        return throwError(() => error);
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getAuthToken(): string | null {
    const token = this.getToken();
    if (token && this.isTokenExpired(token)) {
      // Token is expired, try to refresh
      this.refreshToken().subscribe();
      return null;
    }
    return token;
  }

  // Token management
  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  private setUserData(user: User): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  private getUserData(): User | null {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  private extractUserId(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || 'unknown';
    } catch {
      return 'unknown';
    }
  }

  private extractUserName(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.preferred_username || payload.name || 'Unknown User';
    } catch {
      return 'Unknown User';
    }
  }

  // Register method (if needed for Keycloak)
  register(request: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
    // For Keycloak, registration might need to be done through Keycloak admin API
    // or through a custom endpoint in your Java backend
    return this.http.post<ApiResponse<AuthResponse>>(
      `${this.API_BASE_URL}/api/auth/register`,
      request
    ).pipe(
      catchError(error => {
        console.error('Registration error:', error);
        return of({
          success: false,
          message: 'Registration failed',
          data: {} as AuthResponse
        });
      })
    );
  }
} 