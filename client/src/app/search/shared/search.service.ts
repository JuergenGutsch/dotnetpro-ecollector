import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AuthHttp} from "angular2-jwt";

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { ISearchModel } from './isearch-model';
import { ITimelineRequestModel } from '../../shared/itimeline-request-model';
import { ITimelineModel } from '../../shared/itimeline-Model';


@Injectable()
export class SearchService {
    private _service: string = 'http://localhost:5000/';

    constructor(private _authHttp: AuthHttp) { }

    search(searchModel: ISearchModel): Promise<ITimelineModel> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let body = {
            'SearchTerm': searchModel.text,
            'Types': searchModel.types.join(),
            'DayRange': searchModel.dayRange,
            'PageNumber': searchModel.pageNumber,
            'PageSize': searchModel.pageSize
        }
        let options = new RequestOptions({ headers: headers });
        return this._authHttp.post(`${this._service}api/search`, JSON.stringify(body), options)
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

