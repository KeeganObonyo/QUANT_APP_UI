import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';


import { AppConst } from './app-const';


@Injectable()
export class SignUpService {

  private Path: string = AppConst.serverPath;


  constructor(private http: Http, private router: Router) { }

  registerUser(user: any) {
    const url = this.Path + '/user/signup/';
    const headers = new Headers({
      // 'Content-Type': 'application/json',
    });
    return this.http.post(url, JSON.stringify(user), { headers: headers });
  }
}
