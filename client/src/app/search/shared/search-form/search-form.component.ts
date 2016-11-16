import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { SearchService } from '../search.service';
import { ISearchModel } from '../isearch-model';

@Component({
  selector: 'app-search-form',
  templateUrl: 'search-form.component.html',
  styleUrls: ['search-form.component.css'],
  providers: [SearchService]
})
export class SearchFormComponent implements OnInit {

  public searchTypes = [
    { name: 'All', selected: true },
    { name: 'Images', selected: false },
    { name: 'Videos', selected: false },
    { name: 'Audios', selected: false },
    { name: 'Documents', selected: false },
  ];
  public searchTerm: string = '';
  public dayRange: number = 0;

  constructor(private _searchService: SearchService) { }

  @Output() search: EventEmitter<ISearchModel> = new EventEmitter<ISearchModel>();

  ngOnInit() {
  }

  doSearch() {
    console.log('search clicked')
    let model: ISearchModel = {
      text: this.searchTerm,
      dayRange: this.dayRange,
      types: this.searchTypes.filter(_ => _.selected).map(_ => _.name),
      pageNumber: 0,
      pageSize: 15
    }
    this.search.next(model);
  }
}
