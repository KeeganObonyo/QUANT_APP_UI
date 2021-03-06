import { Component, OnInit } from '@angular/core';
import { HomepageService } from '../homepage.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CDK_TABLE_TEMPLATE } from '@angular/cdk/table';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public http: Http, public router: Router, public route: ActivatedRoute, public datas: HomepageService) { }
  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 59, 70, 81, 56, 55, 40, 56, 55, 40], label: 'open' },
    { data: [28, 69, 55, 56, 76, 66, 70, 56, 55, 40], label: 'close' },
  ];
  public lineChartData2: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40, 56, 55, 40], label: 'high' },
    { data: [28, 48, 40, 19, 86, 27, 90, 56, 55, 40], label: 'low' },
  ];
  public lineChartLabels: Array<any> = ['time1', 'time2', 'time3', 'time4', 'time5', 'time6', 'time7'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // blue
      backgroundColor: 'rgba(0,161,184,0.2)',
      // borderColor: 'rgba(202,0,81,0.8)',
      pointBackgroundColor: 'rgba(0,161,184)',
      pointBorderColor: 'rgba(0,161,184)',
      pointHoverBackgroundColor: 'rgba(0,161,184,0.8)',
      pointHoverBorderColor: 'rgba(0,161,184)'
    },
    { // red
      backgroundColor: 'rgba(200,43,0,0.2)',
      // borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(200,43,0)',
      pointBorderColor: 'rgba(200,43,0)',
      pointHoverBackgroundColor: 'rgba(200,43,0)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartColors2: Array<any> = [
    { // greenish
      backgroundColor: 'rgba(189,149,0,0.3)',
      // borderColor: 'rgba(189,149,0)',
      pointBackgroundColor: 'rgba(189,149,0)',
      pointBorderColor: 'rgba(189,149,0)',
      pointHoverBackgroundColor: 'rgba(189,149,0)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // purple
      backgroundColor: 'rgba(120,0,187,0.1)',
      // borderColor: 'rgba(77,83,96)',
      pointBackgroundColor: 'rgba(120,0,187)',
      pointBorderColor: '#6800b8',
      pointHoverBackgroundColor: 'rgba(120,0,187,0.2)',
      pointHoverBorderColor: 'rgba(120,0,187)'
    }

  ];
  // polar chart

  public polarAreaChartLabels: any[] = ['open', 'high', 'low', 'close'];
  public polarAreaChartData: any[] = [0.65, 0.59, 0.80, 0.81];
  public polarAreaLegend = true;
  public polarAreaChartType = 'polarArea';
  public polarChartColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['rgba(0,161,184)', 'rgba(120,0,187)', 'rgba(189,149,0)', 'rgba(200,43,0)']
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public newdata: any[] = [];
  public x_axis: string[] = [];
  public y_axis_open: string[] = [];
  public y_axis_close: string[] = [];
  public y_axis_high: string[] = [];
  public y_axis_low: string[] = [];
  public newlist: any[] = [];
  public newlist1: any[] = [];

  // table data
  public TableListData: Array<any> = [
    { data: [56, 0.65, 0.59, 0.80, 0.81], label: ['volume', 'open', 'high', 'low', 'close'] }];
  public getdata(): void {

    this.datas.getLatestdata().subscribe(
      res => {
        this.newdata = res.json();
        for (const k in this.newdata) {
          if (k) {
            const str = k;
            const newstr = str.slice(11);
            this.x_axis.push(newstr);
          }
        }
        const data_to_loop = this.newdata;
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
        this.lineChartData2[0].label = 'high';
        this.lineChartData2[0].data = this.y_axis_high;
        this.lineChartData2[1].label = 'low';
        this.lineChartData2[1].data = this.y_axis_low;
        this.lineChartData[1].label = 'close';
        this.lineChartData[1].data = this.y_axis_close;


      },
      error => {
        console.log(error);
      }
    );

  }
  // retrieve analysis volatility
  public getAnalysis() {
    this.datas.getAnalysis().subscribe(
      res => {
        console.log(res.json());
        this.newdata = res.json();
        ///when using the Alphavantage golang///////
        // this.newlist1.push(this.newdata[1]['open']);
        // this.newlist1.push(this.newdata[3]['high']);
        // this.newlist1.push(this.newdata[4]['low']);
        // this.newlist1.push(this.newdata[2]['close']);
        ///////////////////////////////////////////////
        //When using the scala LOl App//
        this.newlist1.push(this.newdata['open']);
        this.newlist1.push(this.newdata['high']);
        this.newlist1.push(this.newdata['low']);
        this.newlist1.push(this.newdata['close']);
        this.polarAreaChartData = this.newlist1;
        this.table();
      },
      error => {
        console.log(error);
      }

    );

  }

  // events
  public chartClicked() {
    console.log('uber');
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public table() {
    const newlist1: any[] = [];
    ///when using the golang alphavantage app/////
    // newlist1.push(this.newdata[0]['volume']);
    // newlist1.push(this.newdata[1]['open']);
    // newlist1.push(this.newdata[3]['high']);
    // newlist1.push(this.newdata[4]['low']);
    // newlist1.push(this.newdata[2]['close']);
    // ////////////////////////////////////////
    //When using the scala LOl App//
    newlist1.push(Math.round(this.newdata['volume']* 10000)/10000);
    newlist1.push(Math.round(this.newdata['open']* 10000)/10000);
    newlist1.push(Math.round(this.newdata['high']* 10000)/10000);
    newlist1.push(Math.round(this.newdata['low']* 10000)/10000);
    newlist1.push(Math.round(this.newdata['close']* 10000)/10000);
    this.TableListData[0].data = newlist1;
  }

  ngOnInit() {
    this.getdata();
    this.getAnalysis();
  }

}

