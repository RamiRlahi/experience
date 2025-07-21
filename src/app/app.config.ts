import { provideRouter } from '@angular/router';
import { ApplicationConfig, provideZoneChangeDetection , APP_INITIALIZER} from '@angular/core';
import { provideKeycloak } from 'keycloak-angular';
import { routes } from './app.routes';
import { initializeKeycloak } from './keycloak-init';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
};