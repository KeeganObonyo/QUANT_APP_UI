import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';


import { AppConst } from './app-const';


@Injectable()
export class LoginService {

  private Path: string = AppConst.serverPath;


  constructor(private http: Http, private router: Router) { }


  getUserToken(credentials: any) {
    const url = this.Path + '/auth';
    const headers = new Headers({
      'content-type': 'application/json'
    });

    return this.http.post(url, JSON.stringify(credentials), { headers: headers });
  }

  logout() {
    localStorage.removeItem('token');
  }

}
