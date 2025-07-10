import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { User, LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://api.example.com/auth'; // Replace with your API URL
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    // Initialize user from storage
    const userData = this.tokenService.getUserData();
    if (userData && !this.tokenService.isTokenExpired()) {
      this.currentUserSubject.next(userData);
    }
  }

  register(request: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
    // Mock API call for demo purposes
    return this.mockApiCall(() => {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: request.email,
        name: request.name,
        createdAt: new Date()
      };
      
      const mockToken = this.generateMockToken(mockUser);
      
      return {
        success: true,
        data: {
          token: mockToken,
          user: mockUser,
          expiresIn: 3600
        }
      };
    });
  }

  login(request: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    // Mock API call for demo purposes
    return this.mockApiCall(() => {
      // Mock validation
      if (request.email === 'demo@example.com' && request.password === 'password') {
        const mockUser: User = {
          id: 'demo-user-id',
          email: request.email,
          name: 'John Demo',
          createdAt: new Date('2024-01-15') // Fixed date for consistent demo
        };
        
        const mockToken = this.generateMockToken(mockUser);
        
        return {
          success: true,
          data: {
            token: mockToken,
            user: mockUser,
            expiresIn: 3600
          }
        };
      } else {
        throw new Error('Invalid credentials. Please use the demo account: demo@example.com / password');
      }
    });
  }

  logout(): void {
    this.tokenService.clearAll();
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !this.tokenService.isTokenExpired();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private mockApiCall<T>(mockFunction: () => T): Observable<T> {
    return new Observable(observer => {
      setTimeout(() => {
        try {
          const result = mockFunction();
          observer.next(result);
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      }, 1000); // Simulate network delay
    });
  }

  private generateMockToken(user: User): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: user.id,
      email: user.email,
      name: user.name,
      iat: Date.now() / 1000,
      exp: (Date.now() / 1000) + 3600
    }));
    const signature = btoa('mock-signature');
    
    return `${header}.${payload}.${signature}`;
  }

  handleAuthSuccess(response: AuthResponse): void {
    this.tokenService.setToken(response.token);
    this.tokenService.setUserData(response.user);
    this.currentUserSubject.next(response.user);
  }
}