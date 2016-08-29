import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment, appRouteProviders } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [ appRouteProviders ])
    .catch(err => console.error(err));

