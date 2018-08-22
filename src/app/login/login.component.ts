import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginError = false;
  public loggedIn = false;
  public credential = { 'email': '', 'password': '' };

  public password: string;
  public email: string;

  public forgetPasswordEmailSent: boolean;
  public recoverEmail: string;
  output: any;

  user: any;

  cannot_be_blank: boolean;

  constructor(public http: Http, public router: Router, public route: ActivatedRoute, public log: LoginService) { }

  onLogin() {
    localStorage.clear();
    this.log.getUserToken(this.credential).subscribe(
      res => {
        localStorage.setItem('token', 'JWT ' + res.json().token);
        this.loggedIn = true;
        if (localStorage.getItem('token')) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/signup']);
        }
      },
      error => {
        this.router.navigate(['/signup']);
        this.loggedIn = false;
        this.loginError = true;
      }
    );
  }

  validate() {

    if (this.credential.password && this.credential.email) {
      this.cannot_be_blank = false;
      this.onLogin();
    } else {
      this.cannot_be_blank = true;
    }
  }
}
