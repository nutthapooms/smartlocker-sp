import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { DashboardWatchResponse } from 'src/app/shared/model';

@Component({
  selector: 'app-my-watchlist',
  templateUrl: './my-watchlist.component.html',
  styleUrls: ['./my-watchlist.component.scss']
})
export class MyWatchlistComponent implements OnInit {

  watches: DashboardWatchResponse;
  today = moment.now();
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<DashboardWatchResponse>('http://localhost:8080/api/users/1/watch-list').subscribe(data => {
        console.log(data)
        this.watches = data;
      }
    )
  }

}
