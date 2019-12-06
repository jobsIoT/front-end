import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../services/env.service';
import { AlertService } from 'src/app/services/alert.service';
import { User } from '../models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  userPage: User;
  serialnumber: string;
  ispremium: boolean;
  protected isDisabled = true;
  protected modifyString = 'Modify';
  public form = [
      { val: 'Enable sound alarm', isChecked: true },
      { val: 'Enable notification', isChecked: true },
      { val: 'Premium Account', isChecked: false}
    ];

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private alertService: AlertService,
    private authService: AuthService,
    ) { }

  ngOnInit() {
    this.userPage = new User(
      sessionStorage.getItem('firstname'),
      sessionStorage.getItem('lastname'),
      sessionStorage.getItem('email'),
      );
    if (sessionStorage.getItem('serialnumber') === 'undefined' || sessionStorage.getItem('serialnumber') === 'false'){
      this.serialnumber = '';
    } else {
     this.serialnumber = sessionStorage.getItem('serialnumber');
    }
    this.ispremium = JSON.parse(sessionStorage.getItem('ispremium'));
    this.form[2].isChecked = this.ispremium;
  }

  modify() {
    if (this.modifyString === 'Modify') {
      this.modifyString = 'Save';
    } else {
      this.ispremium = this.form[2].isChecked;
      this.modifyString = 'Modify';
      this.authService.modify_user(this.userPage.firstname, this.userPage.lastname, this.userPage.email, this.ispremium, this.serialnumber)
      .subscribe(
        data => {
          this.alertService.presentToast('Modification succeeded!');
        },
        error => {
          if (error.status === 400) {
            this.alertService.presentToast('Modification failed!');
          }
        }
      );
    }
    this.isDisabled = !this.isDisabled;
  }

  logout() {
    sessionStorage.clear();
  }
}
