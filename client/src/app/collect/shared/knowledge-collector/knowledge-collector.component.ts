import { Component, OnInit } from '@angular/core';

import { CollectService } from '../collect.service';
import { ICollectModel } from '../icollect-model';

@Component({
  selector: 'app-knowledge-collector',
  templateUrl: 'knowledge-collector.component.html',
  styleUrls: ['knowledge-collector.component.css'],
})
export class KnowledgeCollectorComponent implements OnInit {
  constructor(private _collectService: CollectService) { }

  ngOnInit() {
  }
  public text: string = '';
  public files: File[];
  public fileSelector: any;

  public save() {
    let model: ICollectModel = {
      text: this.text,
      files: this.files
    }
    this._collectService.Collect(model)
      .then(success => {
        this.text = '';
        this.files = [];
        if (this.fileSelector) {
          this.fileSelector.form.reset();
        }
      });
  }

  public onChange(event) {
    this.fileSelector = event.srcElement
    this.files = this.fileSelector.files;
    console.log(this.files);
  }
}
