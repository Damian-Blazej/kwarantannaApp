import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  constructor(private http: HttpClient) {
    this.countries = [];
    this.http.get('https://api.covid19api.com/summary').subscribe((response: any) => {
      this.countries = response.Countries;
    });
  }

  countries: any;
  searchPhrase = "";

  doRefresh(event) {
    this.http.get('https://api.covid19api.com/summary').subscribe((response: any) => {
    this.countries = response.Countries;});
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
