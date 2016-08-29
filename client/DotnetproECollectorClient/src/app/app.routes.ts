import { provideRouter, RouterConfig } from '@angular/router';

import {CollectComponent} from './collect';
import {SearchComponent} from './search';

const routes: RouterConfig = [
    { path: '', component: CollectComponent, terminal: true },
    { path: 'search', component: SearchComponent }
];

export const appRouteProviders = [
    provideRouter(routes)
];