import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  token: any;

  constructor(private http: HttpClient, private env: EnvService) { }


  load_users() {
    return this.http.post(this.env.API_URL + 'get_users',
    {})
      .pipe(
        tap(token => {
          this.token = token;
          return token;
        }),
      );
  }

  delete_users(elem) {
    return this.http.post(this.env.API_URL + 'del_user',
    {email: elem})
      .pipe(
        tap(token => {
          this.token = token;
          return token;
        }),
      );
  }
}
