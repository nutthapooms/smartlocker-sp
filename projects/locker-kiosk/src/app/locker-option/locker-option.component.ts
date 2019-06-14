import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { detachEmbeddedView } from '@angular/core/src/view';
import { ContainerDetailComponent } from 'projects/manage-storage/src/app/container/container-detail/container-detail.component';
import { delay } from 'q';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-locker-option',
  templateUrl: './locker-option.component.html',
  styleUrls: ['./locker-option.component.scss']
})

export class LockerOptionComponent implements OnInit {
  lockers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  displaynumber = [""];
  lockernum = "";
  
  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router, ) { }

  ngOnInit() {
  }
  @HostListener('document:keydown', ['$event']) onkeydownHandler(event: KeyboardEvent) {
    if (event.key === "Enter") {
      document.getElementById("numPad").innerHTML = serial_number + " Close the door";
      
      serial_number = "";
      // this.router.navigate(['/browse-option'])
      this.checkLocker();
    }
    else {
      if ("1234567890_".includes(event.key)) {
        serial_number = serial_number + event.key
      }
    }
  }
  addnum(num = "") {
    this.lockernum = this.lockernum + num
    document.getElementById("displayNum").innerHTML = "Box number :" + this.lockernum;
  }
  delnum() {
    this.lockernum = this.lockernum.slice(0, -1);
    document.getElementById("displayNum").innerHTML = "Box number :" + this.lockernum;
  }
  openLocker() {
    this.http.get(UrlMaxSlot).subscribe(
      data => {
        maxSlot = data;
        console.log(maxSlot.result);
      }
    )
    if(Number(this.lockernum)<maxSlot.result){
      this.http.get(Url + this.lockernum).subscribe(
        data => {
          console.log(data);
        }
      )
      console.log(Url + this.lockernum);
      document.getElementById("numPad").innerHTML = "Box number " + this.lockernum + " open!  Scan serial";  
    }
    else{
      document.getElementById("displayNum").innerHTML = "No Box number: "+this.lockernum+" Please enter again.";
      this.lockernum = "";
    }
    
    
  }
  checkLocker() {
    this.http.get(Urlcheck + this.lockernum).subscribe(
      data => {
        detail = data;
        console.log("detail is " + detail.result);
        if (detail.result == 1) {
          // alert("close")
          this.router.navigate(['/browse-option'])
        }
        console.log(data);
      }
    )
    this.lockernum = "";
  }
}
var serial_number = ""
var detail;
var maxSlot;
const Url = '/lockers/open/';
const Urlcheck = '/lockers/checkclose/';
const UrlMaxSlot = '/lockers/maxSlot/';






