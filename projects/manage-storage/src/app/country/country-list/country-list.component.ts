import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryDTO } from 'src/app/shared/model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countries: Array<CountryDTO> = new Array<CountryDTO>();
  constructor(private http: HttpClient,
    private location: Location) { }

  ngOnInit() {
    this.http.get<Array<CountryDTO>>('https://smartlocker.azurewebsites.net/api/admin/countries').subscribe(data => {
        console.log(data)
        this.countries = data;
      }
    )
  }
  currentLocation() {
    return this.location.path()
  }

}
