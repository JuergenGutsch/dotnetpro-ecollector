import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { appRouteProviders } from './app.routes';

bootstrap(AppComponent, [ appRouteProviders ])
    .catch(err => console.error(err));
