import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-journeys',
  templateUrl: './journeys.page.html',
  styleUrls: ['./journeys.page.scss'],
})
export class JourneysPage implements OnInit {

  protected journeys: any;
  constructor(
      private authService: AuthService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loadJourneys();
  }

  loadJourneys() {
    this.authService.load_journeys()
    .subscribe(
      data => {
        this.journeys = data;
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
