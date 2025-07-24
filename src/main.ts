import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { initKeycloak } from './services/keycloak.service';

initKeycloak()
  .then((authenticated) => {
    console.log('Keycloak authenticated:', authenticated);
    platformBrowserDynamic().bootstrapModule(AppComponent)
      .catch(err => console.error(err));
  })
  .catch(() => {
    console.error('Keycloak initialization failed');
  });
