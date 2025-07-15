import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

export const authGuard: CanActivateFn = async () => {
  const keycloak = inject(KeycloakService);
  const router = inject(Router);
  
  const authenticated = await keycloak.isLoggedIn();
  
  if (!authenticated) {
    return router.parseUrl('/login');
  }
  
  return true;
};