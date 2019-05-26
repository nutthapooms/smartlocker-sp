import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<DashboardLoanResponse>('http://52.163.226.37/api/users/1/loan-list').subscribe(data => {
        console.log(data)
        this.loans = data;
      }
    )
  }

}
