import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { detachEmbeddedView } from '@angular/core/src/view';
import { ContainerDetailComponent } from 'projects/manage-storage/src/app/container/container-detail/container-detail.component';
import { delay } from 'q';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { DataService } from '../data.service';
@Component({
  selector: 'app-locker-option',
  templateUrl: './locker-option.component.html',
  styleUrls: ['./locker-option.component.scss']
})

export class LockerOptionComponent implements OnInit {
  lockers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  displaynumber = [""];
  lockernum = "";
  card_number: string;
  checkopen = 0;
  constructor(private http: HttpClient, private route: ActivatedRoute,
    private data: DataService,
    private router: Router, ) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.card_number = message);
  }
  // @HostListener('document:keydown', ['$event']) onkeydownHandler(event: KeyboardEvent) {
  //   if (this.checkopen == 1) {
  //     if (event.key === "Enter") {
  //       document.getElementById("numPad").innerHTML = serial_number + " Close the door";

  //       serial_number = "";
  //       // this.router.navigate(['/browse-option'])
  //       this.checkLocker();
  //       this.checkopen = 0;
  //     }
  //     else {
  //       if ("1234567890_".includes(event.key)) {
  //         serial_number = serial_number + event.key
  //       }
  //     }

  //   }
  // }
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
        console.log("choose: "+this.lockernum);
        if (Number(this.lockernum) <= maxSlot.result) {
          // console.log("http://localhost:8080/api/admin/lockerno/" + containerName + "/Locker " + this.lockernum);
          this.http.get("http://localhost:8080/api/admin/lockerno/" + containerName + "/Locker " + this.lockernum).subscribe(
            data => {
              IsAvailable = data;
              console.log(IsAvailable);
              if (IsAvailable == null){
                document.getElementById("displayNum").innerHTML = "No item in this locker. Please enter again.";
                this.lockernum = "";
              } 
              else if (IsAvailable.loaner.employeeId == null ) {
                this.http.get(Url + this.lockernum).subscribe(
                  data => {
                    console.log(data);
                    this.checkLocker();
                  }
                )
                this.http.get("http://localhost:8080/api/admin/borrow/" + IsAvailable.barcode + "/" + this.card_number).subscribe(
                  data => {
                    console.log(data);
                  }
                )
                document.getElementById("numPad").innerHTML = "Pick your item and close the door.";
                // this.checkopen = 1;
                // this.checkopen = 0;
              }
              else {
                alert("this item is not available");
                this.lockernum = "";
              }
            }
          )
        }
        else {
          document.getElementById("displayNum").innerHTML = "No Box number: " + this.lockernum + " Please enter again.";
          this.lockernum = "";
        }

      }
    )
  }
  checkLocker() {
    delay(3000);
    this.http.get(Urlcheck + this.lockernum).subscribe(
      data => {
        detail = data;
        console.log("detail is " + detail.result);
        if (detail.result == 1) {
          // alert("close")
          // alert("Thank you " + this.card_number);
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
var IsAvailable;
const Url = '/lockers/open/';
const Urlcheck = '/lockers/checkclose/';
const UrlMaxSlot = '/lockers/maxSlot/';
var containerName = '80017';





