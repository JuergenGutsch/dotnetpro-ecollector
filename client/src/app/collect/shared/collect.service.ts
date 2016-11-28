import { Injectable, EventEmitter } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AuthHttp} from "angular2-jwt";

import { ICollectModel } from './icollect-model';
import { ITimelineModel } from '../../shared/itimeline-model';
import { ITimelineRequestModel } from '../../shared/itimeline-request-model';
import { UploadService } from './upload.service';

@Injectable()
export class CollectService {

    public TimelineUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
    private _service: string = 'http://localhost:5000/';

    constructor(private _authHttp: AuthHttp, private _uploadService: UploadService) { }

    Collect(collectModel: ICollectModel): Promise<boolean> {
        let model = { text: collectModel.text };

        console.log(collectModel.text);

        let files: File[] = collectModel.files;

        return this._uploadService.upload(`${this._service}api/collect`, collectModel.text, files)
            .then(result => this.ForceReloadTimeline(this))
            .catch(this.handleError);
    }

    private ForceReloadTimeline(that : CollectService) {
        that.TimelineUpdated.next(true);
    }

    LoadTimeline(page: ITimelineRequestModel): Promise<ITimelineModel> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Page-Number': page.pageNumber,
            'Page-Size': page.pageSize
        });
        let options = new RequestOptions({ headers: headers });
        return this._authHttp.get(`${this._service}api/timeline`, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
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
}
