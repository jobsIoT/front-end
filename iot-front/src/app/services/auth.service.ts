import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/users';
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
  
  register(fName: string, lName: string, email: string, pwd: string) {
      return this.http.post(this.env.API_URL + 'inscription',
        {name: fName, lastname: lName, mail: email, password: pwd})
        .pipe(
          tap(token => {
            this.token = token;
            this.isLoggedIn = true;
            sessionStorage.setItem("user_id", this.token['id']);
            sessionStorage.setItem("name", this.token['name']);
            sessionStorage.setItem("lastname", this.token['lastname']);
            sessionStorage.setItem("email", this.token['email']);
            return token;
          }),
        );
    }
    
    login(email: string, pwd: string) {
        return this.http.post(this.env.API_URL + 'connexion',
          {mail: email,  password: pwd})
          .pipe(
            tap(token => {
              this.token = token;
              this.isLoggedIn = true;
    
              sessionStorage.setItem("user_id", this.token['id']);
              sessionStorage.setItem("name", this.token['name']);
              sessionStorage.setItem("lastname", this.token['lastname']);
              sessionStorage.setItem("email", this.token['email']);
              return token;
            }),
          );
        }

    getUserId() {
        return sessionStorage.getItem('user_id');
        }
    }