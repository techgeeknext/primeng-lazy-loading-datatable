import { Injectable } from '@angular/core';
import { Flight } from "../model/flight";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FlightsService {
  
  constructor(private http: HttpClient) { 
  }

  public getFlightsData() {
    return this.http.get<any>('assets/data.json')
      .toPromise()
      .then(res => {return <Flight[]>res;});
    }
  
}