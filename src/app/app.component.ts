import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public http: Http, public router: Router) { }

  status: boolean; true;

  Togle() {
    this.status = !this.status;
    console.log(this.status);
  }

}