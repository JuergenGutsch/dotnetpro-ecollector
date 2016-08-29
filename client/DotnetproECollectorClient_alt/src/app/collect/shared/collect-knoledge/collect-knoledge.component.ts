import { Component, OnInit } from '@angular/core';

import {CollectService, ICollectModel} from '../collect.service';

@Component({
  moduleId: module.id,
  selector: 'app-collect-knoledge',
  templateUrl: 'collect-knoledge.component.html',
  styleUrls: ['collect-knoledge.component.css']
})
export class CollectKnoledgeComponent implements OnInit {
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
      .subscribe(
      success => {
        // handle success
      },
      error => {
        // handle errormessage
      }
      );
  }
}
