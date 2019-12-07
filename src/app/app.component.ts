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
  public appPages = [
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

  constructor(
    private platform: Platform,
    private menuController: MenuController,
    private router: Router
  ) { }
}
