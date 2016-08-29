import {Component} from '@angular/core';

import {SearchFormComponent} from './search-form.component';
import {SearchResultComponent} from './search-result.component';

@Component({
    selector: 'search',
    templateUrl: './app/search/search.template.html',
    directives: [SearchFormComponent, SearchResultComponent]
})
export class SearchComponent {
    
}