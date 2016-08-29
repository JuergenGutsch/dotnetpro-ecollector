import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ICollectModel } from './icollect-model';
import { ITimelineModel } from '../../shared/itimeline-model';
import { ITimelineRequestModel } from '../../shared/itimeline-request-model';

@Injectable()
export class CollectService {

    constructor(private _http: Http) { }

    Collect(collectModel: ICollectModel): Promise<boolean> {
        let model = { text: collectModel.text };

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('api/Collector', JSON.stringify(model), options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    LoadTimeline(page: ITimelineRequestModel): Promise<ITimelineModel> {
        let headers = new Headers({
                'Content-Type': 'application/json',
                'Page-Number': page.pageNumber,
                'Page-Size': page.pageSize 
            });
        let options = new RequestOptions({ headers: headers });
        // return this._http.get(`api/Collector`, options)
        //     .toPromise()
        //     .then(this.extractData)
        //     .catch(this.handleError);
        return new Promise<ITimelineModel>((resolve, reject) => resolve(this.timeline));
    }

    private extractData(res: Response) {
        let data = res.json();
        return data || {};
    }
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        throw errMsg;
    }

    private timeline = {
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
                    src: '/assets/img/testfile.mp4'
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
                        src: '/assets/img/sea.jpg',
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
                    src: '/assets/img/background.mp3'
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
    };
}
