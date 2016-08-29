import { Component, OnInit } from '@angular/core';

import {CollectService} from '../collect.service';
import {ICollectModel} from '../icollect-model';

@Component({
  moduleId: module.id,
  selector: 'app-knoledge-collector',
  templateUrl: 'knoledge-collector.component.html',
  styleUrls: ['knoledge-collector.component.css'],
  providers: [CollectService]
})
export class KnoledgeCollectorComponent implements OnInit {
  constructor(private _collectService: CollectService) { }

  ngOnInit() {
  }
  public text: string = '';
  public files: any[];

  public save() {
    let model: ICollectModel = {
      text: this.text,
      files: this.files
    }
    this._collectService.Collect(model)
      .then(success => {
        // handle success
      });
  }
}
