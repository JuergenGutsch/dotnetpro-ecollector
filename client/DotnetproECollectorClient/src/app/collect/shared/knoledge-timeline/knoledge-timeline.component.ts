import { Component, OnInit } from '@angular/core';

import {CollectService} from '../collect.service';
import { ITimelineModel } from '../../../shared/itimeline-model';
import { ITimelineItemModel } from '../../../shared/itimeline-item-model';
import { ITimelineRequestModel } from '../../../shared/itimeline-request-model';

@Component({
  moduleId: module.id,
  selector: 'app-knoledge-timeline',
  templateUrl: 'knoledge-timeline.component.html',
  styleUrls: ['knoledge-timeline.component.css'],
  providers: [CollectService]
})
export class KnoledgeTimelineComponent implements OnInit {
  constructor(private _collectService: CollectService) { }

  timeline: ITimelineModel = {
    items: [],
    pageNumber: 0,
    pageSize: 15
  };

  ngOnInit() {
    this.loadTimeline();
  }

  private loadTimeline(){
    let timelineRequest: ITimelineRequestModel = {
      pageNumber: this.timeline.pageNumber,
      pageSize: this.timeline.pageSize,
    };

    this._collectService.LoadTimeline(timelineRequest)
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

      if( Math.round(window.scrollY) >= (documentHeight - browserHeight - 10)){
        this.loadTimeline();  
      }
    }
}
