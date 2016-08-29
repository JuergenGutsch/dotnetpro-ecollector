import {Component} from '@angular/core';
import {Http, Response, HTTP_PROVIDERS, Headers, RequestOptions} from '@angular/http';


import {CollectKnoledgeComponent} from './collect-knoledge.component';
import {KnoledgeTimelineComponent} from './knoledge-timeline.component';

@Component({
    selector: 'collect',
    templateUrl: 'app/collect/collect.template.html',
    directives: [CollectKnoledgeComponent, KnoledgeTimelineComponent],
    providers: [HTTP_PROVIDERS]
})
export class CollectComponent {}