import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

export interface Login {
    email: string;
    password: string;
    rememberMe: boolean;
}
export interface LoginResult {
    access_token: string;
    expires_in: number;
    fullname: string;
    username: string;
}

@Injectable()
export class AccountService {

  constructor(private _http : Http) { }

    public login(login: Login): Observable<LoginResult> {
        let model = login;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        let formData: string = `username=${model.email}&password=${model.password}`;
        return this._http.post('/api/token', formData, options)
            .map((res) => this.extractObject(res))
            .catch(this.handleErrorObservable);
    }
    

    protected extractObject(res: Response, showprogress: boolean = true) {
        let data = res.json();       
        return data || {};
    }

    protected handleErrorObservable(error: any) {
        try {
            error = JSON.parse(error._body);
        } catch (e) {
        }

        let errMsg = error.errorMessage
            ? error.errorMessage
            : error.message
                ? error.message
                : error._body
                    ? error._body
                    : error.status
                        ? `${error.status} - ${error.statusText}`
                        : 'unknown server error';

        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
