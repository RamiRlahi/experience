import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth',
        realm: 'myrealm',
        clientId: 'angular-client',
      },
      initOptions: {
        onLoad: 'login-required',     // or 'check-sso'
        checkLoginIframe: true,
      },
      bearerExcludedUrls: ['/assets'], // Exclude static files from being intercepted
    });
}
