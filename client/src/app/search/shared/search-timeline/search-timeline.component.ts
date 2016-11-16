import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { ITimelineModel } from '../../../shared/itimeline-model';

@Component({
  selector: 'app-search-timeline',
  templateUrl: 'search-timeline.component.html',
  styleUrls: ['search-timeline.component.css']
})
export class SearchTimelineComponent implements OnInit {

  constructor() { }
  
  @Input() timeline: ITimelineModel;

  ngOnInit() {
  }
}
