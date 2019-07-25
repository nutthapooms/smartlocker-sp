import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import * as moment from 'moment';
import { DashboardLoanResponse } from 'src/app/shared/model';

@Component({
  selector: 'app-my-item',
  templateUrl: './my-item.component.html',
  styleUrls: ['./my-item.component.scss']
})
export class MyItemComponent implements OnInit {
  loans: DashboardLoanResponse;
  today = moment.now();
  constructor(private http: HttpClient,
    private handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
     }

  ngOnInit() {
    this.http.get<DashboardLoanResponse>('https://smartlocker.azurewebsites.net/api/users/1/loan-list').subscribe(data => {
        console.log(data)
        this.loans = data;
      }
    )
  }

}
