import { Component, OnInit } from '@angular/core';

import { CollectService } from '../collect.service';
import { ITimelineModel } from '../../../shared/itimeline-model';
import { ITimelineItemModel } from '../../../shared/itimeline-item-model';
import { ITimelineRequestModel } from '../../../shared/itimeline-request-model';

@Component({
  selector: 'app-knowledge-timeline',
  templateUrl: 'knowledge-timeline.component.html',
  styleUrls: ['knowledge-timeline.component.css'],
})
export class KnowledgeTimelineComponent implements OnInit {
  constructor(private _collectService: CollectService) { }

  timeline: ITimelineModel = {
    items: [],
    pageNumber: 0,
    pageSize: 15,
    overallLength: 0
  };

  ngOnInit() {
    this.loadTimeline(false);
    this._collectService.TimelineUpdated
      .subscribe(item => this.loadTimeline(false));
  }

  private loadTimeline(nextPage: boolean) {
    let timelineRequest: ITimelineRequestModel = {
      pageNumber: nextPage ? this.timeline.pageNumber : 0,
      pageSize: this.timeline.pageSize,
    };

    this._collectService.LoadTimeline(timelineRequest)
      .then(data => {
        this.timeline.items = nextPage ? this.timeline.items.concat(data.items) : data.items;
        this.timeline.pageNumber = data.pageNumber + 1;
        this.timeline.overallLength = data.overallLength;
      });
  }

  private _loaded: boolean = false;
  onScroll(event) {
    let body = document.body,
      html = document.documentElement;

    let browserHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    if (!this._loaded && Math.round(window.scrollY) >= (documentHeight - browserHeight - 10)) {
      this.loadTimeline(true);
      this._loaded = true;
      window.setTimeout(() => {
        this._loaded = false;
      }, 500);
    }
  }
}
  