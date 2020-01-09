import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from 'src/app/services/env.service';
import { error } from 'util';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  token: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
  ) { }

  signup(userFirstname: string, userLastname: string, userEmail: string, userPassword: string) {
    return this.http.post(this.env.API_URL + 'inscription',
      {firstname: userFirstname, lastname: userLastname, email: userEmail, password: userPassword, ispremium: false, serialnumber: '', isadmin: false})
      .pipe(
        tap(token => {
          this.token = token;
          this.isLoggedIn = true;
          sessionStorage.setItem('user_id', this.token.id);
          sessionStorage.setItem('firstname', this.token.firstname);
          sessionStorage.setItem('lastname', this.token.lastname);
          sessionStorage.setItem('email', this.token.email);
          sessionStorage.setItem('serialnumber', this.token.serialnumber);
          sessionStorage.setItem('ispremium', this.token.ispremium);
          sessionStorage.setItem('isConnected', 'true');
          return token;
        }),
      );
  }

  login(userEmail: string, userPassword: string) {
    return this.http.post(this.env.API_URL + 'connexion',
      {email: userEmail,  password: userPassword})
      .pipe(
        tap(token => {
          this.token = token;
          this.isLoggedIn = true;
          sessionStorage.setItem('user_id', this.token.id);
          sessionStorage.setItem('firstname', this.token.firstname);
          sessionStorage.setItem('lastname', this.token.lastname);
          sessionStorage.setItem('email', this.token.email);
          sessionStorage.setItem('serialnumber', this.token.serialnumber);
          sessionStorage.setItem('ispremium', this.token.ispremium);
          sessionStorage.setItem('isConnected', 'true');
          sessionStorage.setItem('isAdmin', this.token.isadmin);
          return token;
        }),
      );
  }



  modify_user(userFirstname: string, userLastname: string, userEmail: string, isPremium: boolean, serialNumber: string ) {
    return this.http.post(this.env.API_URL + 'modify_user',
    {firstname: userFirstname, lastname: userLastname, email: userEmail, serialnumber: serialNumber, ispremium: isPremium})
    .pipe(
      tap(token => {
        this.token = token;
        sessionStorage.setItem('firstname', this.token.firstname);
        sessionStorage.setItem('lastname', this.token.lastname);
        sessionStorage.setItem('email', this.token.email);
        sessionStorage.setItem('serialnumber', this.token.serialnumber);
        sessionStorage.setItem('ispremium', this.token.ispremium);
        return token;
      })
    );
  }

  load_journeys() {
    return this.http.post(this.env.API_URL + 'get_journeys',
    {email: sessionStorage.getItem('email')})
      .pipe(
        tap(token => {
          this.token = token;
          return token;
        }),
      );
  }
  getUserId() {
    return sessionStorage.getItem('user_id');
  }

}
