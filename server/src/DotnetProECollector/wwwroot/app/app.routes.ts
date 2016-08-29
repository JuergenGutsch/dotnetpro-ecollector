import { provideRouter, RouterConfig } from '@angular/router';

import {CollectComponent} from './collect/collect.component';
import {SearchComponent} from './search/search.component';

const routes: RouterConfig = [
    { path: '', component: CollectComponent },
    { path: 'search', component: SearchComponent }
];

export const appRouteProviders = [
    provideRouter(routes)
];