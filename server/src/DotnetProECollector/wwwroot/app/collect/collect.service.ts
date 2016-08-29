import {Injectable, Component} from '@angular/core';
import {Http, Response, HTTP_PROVIDERS, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

export interface ICollectModel {
    text: string;
    files: any[];
}

export interface ITimelineModel {
    items: ITimelineItem[];
    pageNumber: number;
    pageSize: number;
}
export interface ITimelineItem {
    content: string;
    user: string;
    date: Date;
    type: string;
    files: IFile[];
    images: IFile[];
    audio: IFile;
    video: IFile;
}
export interface IFile {
    src: string;
    name: string;
}
export interface ITimelineRequest {
    pageNumber: number;
    pageSize: number;
}


@Component({
    providers: [HTTP_PROVIDERS]
})
@Injectable()
export class CollectService {
    constructor(private _http: Http) { }

    Collect(collectModel: ICollectModel): Observable<boolean> {
        let model = { text: collectModel.text };

        // how to send files?
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('api/Collector', JSON.stringify(model), options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    LoadTimeline(page: ITimelineRequest): Observable<ITimelineModel> {
        let size = 15
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get(`api/Collector/${page.pageNumber}/${page.pageSize}`, options)
            .map(this.extractData)
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
        return Observable.throw(errMsg);
    }
}