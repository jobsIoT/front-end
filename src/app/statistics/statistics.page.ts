import { Component, OnInit, ViewChild  } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { StatisticsService } from './service/statistics.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  protected pullsList: any;
  protected segmentChanged: string;
  protected bars: any;
  protected dateNow: string;
  protected dateSelected: boolean;
  protected listdate: any;
  protected shift: any;
  protected possibleNext: boolean;
  protected possiblePrevious: boolean;
  @ViewChild('barChart', {static: false}) barChart;

  constructor(private statisticsService: StatisticsService, private alertService: AlertService) {
    this.segmentChanged = 'histo';
  }

  ngOnInit() {
    this.dateSelected = false;
    this.loadCardiaque();
    this.dateNow = '';
    this.shift = 0;
    this.possibleNext = false;
    this.possiblePrevious = false;
  }

  onChange($event) {
    this.dateSelected = true;
    this.dateNow = $event.target.value;
    this.shift = 0;
    this.possibleNext = false;
    this.possiblePrevious = false;
    this.createChart();
  }

  addShift() {
    this.shift += 1;
    this.createChart();
  }

  minusShift() {
    this.shift -= 1;
    this.createChart();
  }

  createChart() {
    let x = [];
    let date = [];
    for (let i = 0; i < this.pullsList.length; i++) {
      if (this.pullsList[i].date.split(' ')[0] === this.dateNow) {
       x.push(this.pullsList[i].rythme);
       date.push(this.pullsList[i].date.split(' ')[1]);
      }
    }
    if (x.length > this.shift * 7 + 7) {
      this.possibleNext = true;
    } else {
      this.possibleNext = false;
    }
    if (this.shift !== 0) {
      this.possiblePrevious = true;
    } else {
      this.possiblePrevious = false;
    }
    let valueShown = [];
    let dateShown = [];
    for (let i = this.shift * 7; i < x.length && i < this.shift * 7 + 7; i++) {
      valueShown.push(x[i]);
      dateShown.push(date[i]);
    }
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: dateShown,
        datasets: [{
          label: 'Rythme in bpm',
          data: valueShown,
          backgroundColor: 'rgb(0, 0, 0, 0)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }

  loadCardiaque() {
    this.statisticsService.load_cardiaque()
    .subscribe(
      data => {
        this.listdate = [];
        for(let x in data) {
          if(!this.listdate.includes(data[x].date.split(' ')[0])){
            this.listdate.push(data[x].date.split(' ')[0]);
          }
        }
        this.pullsList = data;
      },
      error => {
        if (error.status === 400) {
          this.alertService.presentToast('Failed to contact backend');
        } else if (error.status === 500) {
          this.alertService.presentToast('Internal server error');
        }
      },
    );
  }
}
