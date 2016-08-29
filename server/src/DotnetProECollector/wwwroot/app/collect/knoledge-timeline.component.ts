import {Component, OnInit} from '@angular/core';

import {CollectService, ITimelineModel, ITimelineItem, ITimelineRequest} from './collect.service';

@Component({
    selector: 'knoledge-timeline',
    templateUrl: 'app/collect/knoledge-timeline.template.html',
    providers: [CollectService]
})
export class KnoledgeTimelineComponent implements OnInit {
    constructor(private _collectService: CollectService) { }

    errormessage: string;
    timeline: ITimelineModel = {
        items: [],
        pageNumber: 0,
        pageSize: 15
    };

    ngOnInit() {
        this.errormessage = '';
        let timelineRequest: ITimelineRequest = {
            pageNumber: this.timeline.pageNumber,
            pageSize: this.timeline.pageSize,
        };
        //this._collectService.LoadTimeline(timelineRequest)
        //    .subscribe(
        //    data => this.timeline.items.concat(data.items),
        //    error => this.errormessage = error
        //    );


        this.timeline = {
            items: [
                {
                    content: 'Hallo Welt',
                    user: 'Juergen',
                    date: new Date(2016, 6, 2),
                    type: 'text',
                    files: [],
                    images: [],
                    audio: null,
                    video: null
                },
                {
                    content: 'Hallo Welt',
                    user: 'Juergen',
                    date: new Date(2016, 6, 2),
                    type: 'video',
                    files: [],
                    images: [],
                    audio: null,
                    video: {
                        name: 'Hallo Welt',
                        src: '/img/testfile.mp4'
                    }
                },
                {
                    content: 'Hallo Welt',
                    user: 'Juergen',
                    date: new Date(2016, 6, 2),
                    type: 'images',
                    files: [],
                    images: [
                        {
                            src: '/img/sea.jpg',
                            name: 'Seattle'
                        }
                    ],
                    audio: null,
                    video: null
                },
                {
                    content: 'Hallo Audio',
                    user: 'Juergen',
                    date: new Date(2016, 6, 2),
                    type: 'audio',
                    files: [],
                    images: [],
                    audio: {
                        name: 'Hallo Audio',
                        src: '/img/background.mp3'
                    },
                    video: null
                },
                {
                    content: 'Hallo Welt',
                    user: 'Juergen',
                    date: new Date(2016, 6, 2),
                    type: 'text',
                    files: [],
                    images: [],
                    audio: null,
                    video: null
                },
                {
                    content: 'Hallo Welt',
                    user: 'Juergen',
                    date: new Date(2016, 6, 2),
                    type: 'text',
                    files: [],
                    images: [],
                    audio: null,
                    video: null
                },
                {
                    content: 'Hallo Welt',
                    user: 'Juergen',
                    date: new Date(2016, 6, 2),
                    type: 'text',
                    files: [],
                    images: [],
                    audio: null,
                    video: null
                }
            ],
            pageNumber: 0,
            pageSize: 15
        }

    }
}