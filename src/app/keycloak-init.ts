import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080/auth',
  realm: 'myrealm',
  clientId: 'angular-client',
});

export function initializeKeycloak(): () => Promise<boolean> {
  return () =>
    keycloak
      .init({
        onLoad: 'login-required',
        checkLoginIframe: false,
      })
      .then((authenticated: boolean) => {
        console.log('[Keycloak] Authenticated:', authenticated);
        return true;
      })
      .catch((err: unknown) => {
        console.error('[Keycloak] Initialization failed', err);
        return false;
      });
}

export { keycloak };
