import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-locker-option',
  templateUrl: './locker-option.component.html',
  styleUrls: ['./locker-option.component.scss']
})

export class LockerOptionComponent implements OnInit {

  constructor(private httpClient:HttpClient) { }
  lockers = [1,2,3,4,5,6,7,8,9,10,11]
  
  ngOnInit() {
  }
  

}





