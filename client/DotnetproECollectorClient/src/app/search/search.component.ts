import { Component, OnInit } from '@angular/core';

import { SearchService } from './shared/search.service';
import {SearchFormComponent} from './shared/search-form';
import {SearchTimelineComponent} from './shared/search-timeline';
import { ISearchModel } from './shared/isearch-model';
import { ITimelineModel } from '../shared/itimeline-model';

@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  directives: [
    SearchFormComponent, 
    SearchTimelineComponent
  ],
  providers: [SearchService]

})
export class SearchComponent implements OnInit {

  constructor(private _searchService: SearchService) { }

  timeline: ITimelineModel = {
    items: [],
    pageNumber: 0,
    pageSize: 15
  };
  searchModel: ISearchModel;

  ngOnInit() {
  }

  onSearch(event : ISearchModel){
    this.timeline = {
      items: [],
      pageNumber: 0,
      pageSize: 15
    };
    console.log('search for:', event);
    this.searchModel = event;
    if(this.searchModel){
      this.loadTimeline();
    }
  }

  private loadTimeline(){
    let searchRequest: ISearchModel = {
      text: this.searchModel.text,
      dayRange: this.searchModel.dayRange,
      types: this.searchModel.types,
      pageNumber: this.timeline.pageNumber,
      pageSize: this.timeline.pageSize,
    };

    this._searchService.search(searchRequest)
      .then(
        data => {
          this.timeline.items = this.timeline.items.concat(data.items);
          this.timeline.pageNumber = data.pageNumber +1;
        });
  }

  onScroll(event) {
    var body = document.body,
    html = document.documentElement;

    let browserHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    if(this.searchModel && Math.round(window.scrollY) >= (documentHeight - browserHeight - 10)){
      this.loadTimeline();  
    }
  }
}
