import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: 'http://localhost:8080/auth',
  realm: 'myrealm',
  clientId: 'angular-client',
});

export function initKeycloak(): Promise<boolean> {
    return keycloak.init({
      onLoad: 'check-sso',              
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      pkceMethod: 'S256',               
    });
  }