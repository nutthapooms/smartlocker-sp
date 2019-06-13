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
openLocker(){
    // alert(Url+this.lockernum);
    Http.open('GET',Url+this.lockernum);
    Http.send() 
    console.log(Url+this.lockernum);
    this.lockernum = "";

  }
// alert(test());
   test(){
    alert(Url+"2");
    Http.open('GET',Url+"2");
    Http.send() 
}
  

}

const Url = '/lockers/open/';
const Http = new XMLHttpRequest();






