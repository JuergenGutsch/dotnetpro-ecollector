import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { SearchService } from '../search.service';
import { ISearchModel } from '../isearch-model';

@Component({
  moduleId: module.id,
  selector: 'app-search-form',
  templateUrl: 'search-form.component.html',
  styleUrls: ['search-form.component.css'],
  providers: [SearchService]
})
export class SearchFormComponent implements OnInit {

  searchTypes = [
    { name: 'text', selected: true },
    { name: 'images', selected: true },
    { name: 'videos', selected: false },
    { name: 'audios', selected: true },
    { name: 'documents', selected: true },
  ];

  constructor(private _searchService: SearchService) { }

  @Output() search: EventEmitter<ISearchModel> = new EventEmitter<ISearchModel>();
  public searchTerm: string = '';

  ngOnInit() {
  }

  doSearch(){
    console.log('search clicked')
    let model: ISearchModel = {
      text: this.searchTerm,
      dayRange: 0,
      types: this.searchTypes.filter(_ => _.selected).map(_ => _.name),
      pageNumber:0,
      pageSize:15
    }
    this.search.next(model);
  }
}
