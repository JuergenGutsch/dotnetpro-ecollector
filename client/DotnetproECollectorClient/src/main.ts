import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent, environment, appRouteProviders } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [ appRouteProviders, HTTP_PROVIDERS ])
    .catch(err => console.error(err));
