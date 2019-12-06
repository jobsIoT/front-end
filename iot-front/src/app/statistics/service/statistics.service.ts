import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  token: any;

  constructor(private http: HttpClient, private env: EnvService) { }


  load_cardiaque() {
    return this.http.post(this.env.API_URL + 'get_pulls',
    {email: sessionStorage.getItem('email')})
      .pipe(
        tap(token => {
          this.token = token;
          return token;
        }),
      );
  }
}
