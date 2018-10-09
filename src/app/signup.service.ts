import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';


import { AppConst } from './app-const';
import { LoginService } from './login.service';


@Injectable()
export class SignUpService {

  private Path: string = AppConst.serverPath;
  public loginError = false;
  public loggedIn = false;
  public credential = { 'email': '', 'password': ''};

  public password: string;
  public email: string;

  public forgetPasswordEmailSent: boolean;
  public recoverEmail: string;
  output: any;

  user: any;


  constructor(private http: Http, private router: Router, public log: LoginService) { }


  onLogin() {
    console.log(this.credential);
    this.log.getUserToken(this.credential).subscribe(
      res => {
        localStorage.setItem('token', 'JWT ' + res.json().token);
        this.loggedIn = true;
        console.log(localStorage.getItem('token'));
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
        this.loggedIn = false;
        this.loginError = true;
      }
    );
  }
  
  registerUser(user: any) {
    const url = this.Path + '/users';
    const headers = new Headers({
      // 'Content-Type': 'application/json',
    });
    return this.http.post(url, JSON.stringify(user), { headers: headers });
  }
}
