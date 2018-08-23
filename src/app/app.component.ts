import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HomepageService } from './homepage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public http: Http, public router: Router, public datas: HomepageService) { }

  status: boolean; false;
  public company: 'Company';

  Togle() {
    this.status = !this.status;
    console.log(this.status);
  }

  public Company() {
    this.datas.getCompany().subscribe(
      res => {
        const data = res.json();
        this.company = data['company'];
        console.log(this.company);
      },
      error => {
        console.log(error);
      }

    );
  }
  ngOnInit() {
    this.Togle();
    this.Company();
  }
}