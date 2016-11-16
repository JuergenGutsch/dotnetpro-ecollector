import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollectComponent } from './collect/collect.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
    { path: '', redirectTo: '/collect', pathMatch: 'full' },
    { path: 'collect', component: CollectComponent },
    { path: 'search', component: SearchComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }