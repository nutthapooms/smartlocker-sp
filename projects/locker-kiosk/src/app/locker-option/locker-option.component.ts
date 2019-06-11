import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locker-option',
  templateUrl: './locker-option.component.html',
  styleUrls: ['./locker-option.component.scss']
})
export class LockerOptionComponent implements OnInit {

  constructor() { }
  lockers = [1,2,3,4,5,6,7,8,9]

  ngOnInit() {
  }

}

const Url = 'http://192.168.4.103:8000/lockers/open/2/';
const Http = new XMLHttpRequest();
function endd(){
  alert('kuy');
  // Http.open('GET',Url);
  // Http.send() 
}
