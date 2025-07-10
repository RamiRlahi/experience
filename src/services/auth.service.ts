import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User, LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly CURRENT_USER_KEY = 'current_user';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const userData = this.getUserData();
    if (userData && this.isAuthenticated()) {
      this.currentUserSubject.next(userData);
    }
  }

  register(request: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
    const users = this.getUsers();
    if (users.find(u => u.email === request.email)) {
      return of({ success: false, message: 'Email already exists', data: {} as AuthResponse });
    }
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: request.email,
      name: request.name,
      createdAt: new Date()
    };
    users.push({ ...newUser, password: request.password });
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    const token = this.generateToken(newUser);
    this.setToken(token);
    this.setUserData(newUser);
    this.currentUserSubject.next(newUser);
    return of({ success: true, data: { token, user: newUser, expiresIn: 3600 } });
  }

  login(request: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    const users = this.getUsers();
    const user = users.find(u => u.email === request.email && u.password === request.password);
    if (user) {
      const { password, ...userData } = user;
      const token = this.generateToken(userData);
      this.setToken(token);
      this.setUserData(userData);
      this.currentUserSubject.next(userData);
      return of({ success: true, data: { token, user: userData, expiresIn: 3600 } });
    }
    return of({ success: false, message: 'Invalid credentials', data: {} as AuthResponse });
  }

  logout(): void {
    this.clearToken();
    this.clearUserData();
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // LocalStorage helpers
  private getUsers(): any[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  private getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  private setUserData(user: any): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }
  private getUserData(): any {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  private clearUserData(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  private generateToken(user: User): string {
    // Simple dummy token for demo purposes
    return btoa(JSON.stringify({ sub: user.id, email: user.email, name: user.name, iat: Date.now() / 1000 }));
  }

  public getAuthToken(): string | null {
    return this.getToken();
  }
}