import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';


import { AppConst } from './app-const';


@Injectable()
export class HomepageService {

  private Path: string = AppConst.serverPath;

  constructor(private http: Http, private router: Router) { }

  getLatestdata() {
    const url = this.Path + '/get/data/';
    const headers = new Headers({
      'Authorization': localStorage.getItem('token'),
    });

    return this.http.get(url, { headers: headers });
  }

}