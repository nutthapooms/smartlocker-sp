import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryDTO } from 'src/app/shared/model';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countries: Array<CountryDTO> = new Array<CountryDTO>();
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Array<CountryDTO>>('http://52.163.226.37/api/admin/countries').subscribe(data => {
        console.log(data)
        this.countries = data;
      }
    )
  }

}