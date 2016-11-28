import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { Login } from './account.service';
import { AccountManagerService } from './account-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _accountManager: AccountManagerService,
    private _router: Router) { }

  errormessage: string = '';
  login: Login = {
    email: '',
    password: '',
    rememberMe: true
  };

  ngOnInit() {
  }

  onLogin() {
    this._accountManager.login(this.login,
      success => {
        if (success) {

          this._router.navigate(['/collect']);
          return

        }
      },
      error => {
        this.errormessage = error;
      });
  }
}
