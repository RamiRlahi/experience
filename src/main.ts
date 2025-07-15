import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { provideKeycloak } from 'keycloak-angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideKeycloak({
      config: {
        url: 'http://localhost:8080/auth',
        realm: 'myrealm',
        clientId: 'angular-client',
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: true,
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      },
    }),
  ],
});
