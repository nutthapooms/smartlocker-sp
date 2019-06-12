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
  displaynumber = "";
  lockernum = "";
  ngOnInit() {
  }
  addnum(num = ""){
    this.lockernum = this.lockernum + num
  }
  // displaynum(){
  //   this.displaynumber =lockernum;
  //   // alert(Url+this.displaynumber);
  //   lockernum = "";
  // }
  endd(num){
    alert(this.lockernum);
    // openLocker(this.lockernum);
    this.lockernum = "";
  }
  openLocker(){
    alert(Url+this.lockernum);
    Http.open('GET',Url);
    Http.send() 
  }

}
const Url = 'http://localhost:8000/lockers/open/';
const Http = new XMLHttpRequest();




