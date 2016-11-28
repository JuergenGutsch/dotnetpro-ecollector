import { Injectable } from '@angular/core';

import { AccountService, Login, LoginResult } from './account.service';


@Injectable()
export class AccountManagerService {

  constructor(private _accountService: AccountService) { }


    public login(login: Login, sucess: any, fail: any): void {

        this._accountService.login(login)
            .subscribe(
            (result: LoginResult) => {
                if (result.access_token) {
                    localStorage.setItem("jwt", result.access_token);
                    localStorage.setItem("name", result.fullname);
                    localStorage.setItem("mail", result.username);
                    sucess(true);
                } else {
                    fail("");
                }
            },
            (error: any) => {
                fail(<any>error);
            });
    }

    public logout(): void {
        localStorage.removeItem("jwt");
        localStorage.removeItem("name");
        localStorage.removeItem("mail");
    }
}
