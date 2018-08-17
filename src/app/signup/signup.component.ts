import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { SignUpService } from '../signup.service';
import { LoginService } from '../login.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public loginError = false;
  public loggedIn = false;
  public credential = { 'email': '', 'password': ''};


  registered = false;
  public emailNotExists = false;
  public forgetPasswordEmailSent: boolean;
  public recoverEmail: string;
  output: any;

  user: any;
  constructor(public http: Http, public router: Router,
     public route: ActivatedRoute, public sign: SignUpService, public log: LoginService) { }

  new_user: User = new User();
  pass: Passwords = new Passwords();
  password_not_match: boolean;

  save() {
    console.log(this.new_user);
    this.sign.registerUser(this.new_user).subscribe(
      res => {
        console.log(res.text());
        this.registered = true;
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err.text());
      }
    );

  }

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

  validate() {

    if (this.pass.password === this.pass.password1) {
      this.password_not_match = false;
      this.save();
    } else {
      this.password_not_match = true;
    }
  }

  loginfunc() {
    this.router.navigate(['/login']);
  }
}

export class User {
  firstname: string;
  lastname: string;
  email: string;
  dateofbirth: string;
  password: string;

}

export class Passwords {
  password: string;
  password1: string;
}

