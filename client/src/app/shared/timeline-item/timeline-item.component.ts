import { Component, OnInit, Input } from '@angular/core';
import { ITimelineItemModel } from '../itimeline-item-model';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.css']
})
export class TimelineItemComponent implements OnInit {

  constructor() { }

  @Input()
  public item: ITimelineItemModel

  ngOnInit() {
  }

}
