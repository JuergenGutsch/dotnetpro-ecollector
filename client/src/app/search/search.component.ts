import { Component, OnInit } from '@angular/core';

import { SearchService } from './shared/search.service';
import { SearchFormComponent } from './shared/search-form/search-form.component';
import { SearchTimelineComponent } from './shared/search-timeline/search-timeline.component';
import { ISearchModel } from './shared/isearch-model';
import { ITimelineModel } from '../shared/itimeline-model';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  providers: [SearchService]

})
export class SearchComponent implements OnInit {

  constructor(private _searchService: SearchService) { }

  timeline: ITimelineModel = {
    items: [],
    pageNumber: 0,
    pageSize: 15,
    overallLength: 0
  };
  searchModel: ISearchModel;

  ngOnInit() {
  }

  onSearch(event: ISearchModel) {
    this.timeline = {
      items: [],
      pageNumber: 0,
      pageSize: 15,
      overallLength: 0
    };
    console.log('search for:', event);
    this.searchModel = event;
    if (this.searchModel) {
      this.loadTimeline(false);
    }
  }

  private loadTimeline(nextPage: boolean) {
    let searchRequest: ISearchModel = {
      text: this.searchModel.text,
      dayRange: this.searchModel.dayRange,
      types: this.searchModel.types,
      pageNumber: nextPage ? this.timeline.pageNumber : 0,
      pageSize: this.timeline.pageSize,
    };

    this._searchService.search(searchRequest)
      .then(data => {
        this.timeline.items = nextPage ? this.timeline.items.concat(data.items) : data.items;
        this.timeline.pageNumber = data.pageNumber + 1;
        this.timeline.overallLength = data.overallLength;
      });
  }

  private _loaded: boolean = false;
  onScroll(event) {
    var body = document.body,
      html = document.documentElement;

    let browserHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    if (!this._loaded && this.searchModel && Math.round(window.scrollY) >= (documentHeight - browserHeight - 10)) {
      this.loadTimeline(true);
      this._loaded = true;
      window.setTimeout(() => {
        this._loaded = false;
      }, 500);
    }
  }
}
