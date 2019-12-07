import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

    API_URL = 'https://iot-jobs.herokuapp.com/';


  constructor() { }
}