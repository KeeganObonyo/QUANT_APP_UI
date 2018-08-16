import { Component, OnInit } from '@angular/core';
import { HomepageService } from '../homepage.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public http: Http, public router: Router, public route: ActivatedRoute, public datas: HomepageService) { }
  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40, 56, 55, 40], label: 'variable1' },
    { data: [28, 48, 40, 19, 86, 27, 90, 56, 55, 40], label: 'variable2' },
    { data: [18, 48, 77, 9, 100, 27, 40, 56, 55, 40], label: 'variable3' },
    { data: [78, 54, 70, 81, 56, 55, 40, 56, 55, 40], label: 'variable4' },
  ];
  public lineChartLabels: Array<any> = ['time1', 'time2', 'time3', 'time4', 'time5', 'time6', 'time7'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(0,161,184,0.3)',
      borderColor: 'rgba(202,0,81,0.8)',
      pointBackgroundColor: 'rgba(189,145,0,0.7)',
      pointBorderColor: 'rgba(0,161,184,0.8)',
      pointHoverBackgroundColor: 'rgba(0,161,184,0.8)',
      pointHoverBorderColor: 'rgba(0,161,184,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#00b819',
      pointHoverBackgroundColor: '#00b819',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#00b819',
      pointHoverBackgroundColor: '#00b819',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#00b819',
      pointHoverBackgroundColor: '#00b819',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public newdata: any;
  public x_axis: string[] = [];
  public y_axis_open: string[] = [];
  public y_axis_close: string[] = [];
  public y_axis_high: string[] = [];
  public y_axis_low: string[] = [];


  public randomize(): void {
    this.datas.getLatestdata();

    this.datas.getLatestdata().subscribe(
      res => {
        this.newdata = res.json();
        for (const k in this.newdata.time_series_slice) {
          if (k) {
            this.x_axis.push(k);
          }
        }
        const data_to_loop = this.newdata.time_series_slice;
        for (const key in data_to_loop) {
          if (key) {
            const value = data_to_loop[key];
            this.y_axis_open.push(value['1. open']);
            this.y_axis_high.push(value['2. high']);
            this.y_axis_low.push(value['3. low']);
            this.y_axis_close.push(value['4. close']);
          }
        }
        this.lineChartLabels = this.x_axis;
        this.lineChartData[0].label = 'open';
        this.lineChartData[0].data = this.y_axis_open;
        this.lineChartData[1].label = 'high';
        this.lineChartData[1].data = this.y_axis_high;
        this.lineChartData[2].label = 'low';
        this.lineChartData[2].data = this.y_axis_low;
        this.lineChartData[3].label = 'close';
        this.lineChartData[3].data = this.y_axis_close;

      },
      error => {
        console.log(error);
      }
    );

  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    this.randomize();
  }

}
