import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};

// Content Services API Configuration
export const CONTENT_SERVICES_CONFIG = {
  // Update this URL to point to your Content Services API
  API_BASE_URL: 'http://localhost:8080/client-api',
  
  // Keycloak Configuration (should match your Keycloak setup)
  KEYCLOAK_CONFIG: {
    url: 'http://localhost:8080',
    realm: 'myrealm',
    clientId: 'angular-client'
  }
}; 