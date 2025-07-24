import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { initKeycloak } from '../services/keycloak.service';
import { initializeKeycloak } from './keycloak-init';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true
    }
  ]
};
