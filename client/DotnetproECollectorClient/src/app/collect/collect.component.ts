import { Component, OnInit } from '@angular/core';

import {KnoledgeCollectorComponent} from './shared/knoledge-collector';
import {KnoledgeTimelineComponent} from './shared/knoledge-timeline';

@Component({
  moduleId: module.id,
  selector: 'app-collect',
  templateUrl: 'collect.component.html',
  styleUrls: ['collect.component.css'],
  directives: [
    KnoledgeCollectorComponent, 
    KnoledgeTimelineComponent],
})
export class CollectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
