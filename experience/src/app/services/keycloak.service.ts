import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'myrealm',
  clientId: 'angular-client'
});

export async function initializeKeycloak(): Promise<boolean> {
  try {
    await keycloak.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
    });
    return true;
  } catch (error) {
    console.error('Keycloak init failed', error);
    return false;
  }
}

export { keycloak };
