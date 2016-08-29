import { Component, OnInit } from '@angular/core';

import {CollectKnoledgeComponent, KnoledgeTimelineComponent} from './shared';

@Component({
  moduleId: module.id,
  directives: [
    CollectKnoledgeComponent, 
    KnoledgeTimelineComponent],
  selector: 'app-collect',
  templateUrl: 'collect.component.html',
  styleUrls: ['collect.component.css']
})
export class CollectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
