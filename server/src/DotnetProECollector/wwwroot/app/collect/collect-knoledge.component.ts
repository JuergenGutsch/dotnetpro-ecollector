import {Component} from '@angular/core';

import {CollectService, ICollectModel} from './collect.service';

@Component({
    selector: 'collect-knoledge',
    templateUrl: 'app/collect/collect-knoledge.template.html',
    providers: [CollectService]
})
export class CollectKnoledgeComponent {
    constructor(private _collectService: CollectService) { }

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