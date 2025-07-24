declare module 'keycloak-js' {
    interface KeycloakConfig {
      url: string;
      realm: string;
      clientId: string;
    }
  
    interface KeycloakInitOptions {
      onLoad?: 'login-required' | 'check-sso';
      checkLoginIframe?: boolean;
    }
  
    export default class Keycloak {
      tokenParsed: boolean | undefined;
      constructor(config: KeycloakConfig);
      token?: string;
      authenticated?: boolean;
      init(options?: KeycloakInitOptions): Promise<boolean>;
      login(): void;
      logout(redirectUri?: string): void;
      getToken(): Promise<string>;
      isTokenExpired(minValidity?: number): boolean;
      updateToken(minValidity?: number): Promise<boolean>;
    }
  }
  