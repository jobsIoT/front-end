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
  @ViewChild('barChart') barChart;

  constructor(private statisticsService: StatisticsService, private alertService: AlertService) {
    this.segmentChanged = 'histo';
  }

  ngOnInit() {
    this.loadCardiaque();
    this.dateNow = 'Date here';
  }

  createChart() {
    let x = [];
    let date = [];
    console.log(this.pullsList);
    for (let i = 0; i < this.pullsList.length; i++) {
      x.push(this.pullsList[i].rythme);
      date.push(this.pullsList[i].date);
      this.dateNow = this.pullsList[i].date;
    }
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: date,
        datasets: [{
          label: 'Rythme in bpm',
          data: x,
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
        this.pullsList = data;
        this.createChart();
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
