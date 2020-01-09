import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages: any;
  public id = setInterval(() => {
    if (sessionStorage.getItem('isConnected') === 'true' && sessionStorage.getItem('isAdmin') === 'false') {
      this.appPages = [
        {
          title: 'Journeys',
          url: '/journeys',
          icon: 'car'
        },
        {
          title: 'Stats',
          url: '/statistics',
          icon: 'stats'
        },
        {
          title: 'Account',
          url: '/profil',
          icon: 'person'
        },
        {
          title: 'Sign Out',
          url: '/home',
          icon: 'power'
        },
      ];
    } else if (sessionStorage.getItem('isAdmin') === 'true') {
       this.appPages = [
        {
          title: 'Dashboard',
          url: '/admin',
          icon: 'settings'
        },
        {
          title: 'Sign Out',
          url: '/home',
          icon: 'power'
        },
      ];
    } else {
      this.appPages = [];
    }
  }, 500);
  constructor(
    private platform: Platform,
    private menuController: MenuController,
    private router: Router
  ) { }
}
