import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakAuthService } from '../services/keycloak-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private keycloakAuthService: KeycloakAuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.keycloakAuthService.isAuthenticated()) {
      return true;
    }

    // Store the attempted URL for redirecting after login
    const currentUrl = state.url;
    
    // Redirect to login page
    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: currentUrl } 
    });
    
    return false;
  }
}