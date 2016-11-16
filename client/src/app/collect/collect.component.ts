import { Component, OnInit } from '@angular/core';

import {KnowledgeCollectorComponent} from './shared/knowledge-collector/knowledge-collector.component';
import {KnowledgeTimelineComponent} from './shared/knowledge-timeline/knowledge-timeline.component';

@Component({
  selector: 'app-collect',
  templateUrl: 'collect.component.html',
  styleUrls: ['collect.component.css']  
})
export class CollectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
