import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-my-item',
  templateUrl: './my-item.component.html',
  styleUrls: ['./my-item.component.scss']
})
export class MyItemComponent implements OnInit {
  loans: any = []
  today = moment.now();
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://52.163.226.37/api/users/1/loan-list').subscribe(data => {
        console.log(data)
        this.loans = data;
      }
    )
  }

}
