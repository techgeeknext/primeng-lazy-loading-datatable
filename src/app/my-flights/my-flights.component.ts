import { Component, OnInit } from '@angular/core';
import {Flight} from '../model/flight';
import { FlightsService } from 'src/app/service/flights.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-my-flights',
  templateUrl: './my-flights.component.html',
  styleUrls: ['./my-flights.component.scss']
})
export class MyFlightsComponent implements OnInit {
  slicedDatabase: Flight[];

  flights: Flight[];

  cols: any[];

  totalRecords: number;

  loading: boolean;

  constructor(private flightService: FlightsService) {
  }

  ngOnInit() {
    this.flightService.getFlightsData().
      then(flights => {
        this.slicedDatabase = flights,
        this.totalRecords = this.flights.length;
      });

    
    this.cols = [     
      { field: 'flightNumber', header: 'Flight' },
      {field: 'origin', header: 'From' },
      { field: 'destination', header: 'To' },
      { field: 'departDay', header: 'Depart Day' },   
      { field: 'price', header: 'Price ($)' } 
  ];
  this.totalRecords=40;
  }

  loadFlightData(event: LazyLoadEvent) {
    this.loading = true;

    // here we can fetch data from backend api database    
    //event.first = offset of the first row. 1 for the first page, 11 for the second page.
    //event.rows = rows per page (10)
    setTimeout(() => {
      if (this.slicedDatabase) {
        this.flights = this.slicedDatabase.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }

}
