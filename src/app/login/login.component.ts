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
  public credential = { 'email': '', 'password': ''};

  public password: string;
  public email: string;

  public forgetPasswordEmailSent: boolean;
  public recoverEmail: string;
  output: any;

  user: any;

  constructor(public http: Http, public router: Router, public route: ActivatedRoute, public log: LoginService) { }

  onLogin() {
    console.log(this.credential);
    this.log.getUserToken(this.credential).subscribe(
      res => {
        localStorage.setItem('token', 'JWT ' + res.json().token);
        this.loggedIn = true;
        console.log(localStorage.getItem('token'));
        this.router.navigate(['']);
      },
      error => {
        console.log(error);
        this.loggedIn = false;
        this.loginError = true;
      }
    );
  }

}
