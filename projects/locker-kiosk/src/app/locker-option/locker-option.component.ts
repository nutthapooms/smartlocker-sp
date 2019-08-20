import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { detachEmbeddedView } from '@angular/core/src/view';
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
  lang = "";
  constructor(private http: HttpClient, private route: ActivatedRoute,
    private data: DataService,
    private router: Router, ) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.card_number = message);
    this.data.currentLanguage.subscribe(message => {
      this.lang = message
      if (this.lang == "thai") {
        this.tothai();
      }
    });
  }
  tothai() {
    document.getElementById("topic").innerHTML = "ตู้ล๊อกเกอร์";
    document.getElementById("sub-topic").innerHTML = "คุณต้องการอุปกรณ์ที่ช่องใด?";
    document.getElementById("enter").innerHTML = "ยืนยัน";
    document.getElementById("delete").innerHTML = "ลบ";

  }
  addnum(num = "") {
    this.lockernum = this.lockernum + num
    document.getElementById("displayNum").innerHTML = "Box number :" + this.lockernum;
  }
  delnum() {
    this.lockernum = this.lockernum.slice(0, -1);
    document.getElementById("displayNum").innerHTML = "Box number :" + this.lockernum;
  }
  disablebtn() {
    for (var i = 0; i < 12; i++) {
      (document.getElementsByClassName("numpad")[i] as HTMLButtonElement).disabled = true;
    }

  }
  ablebtn() {
    for (var i = 0; i < 12; i++) {
      (document.getElementsByClassName("numpad")[i] as HTMLButtonElement).disabled = false;
    }
  }
  openLocker() {
    if (this.lang == "thai") {
      document.getElementById("displayNum").innerHTML = "กรุณารอซักครู่";
    } else {
      document.getElementById("displayNum").innerHTML = "Processing, please wait.";
    }
    
    this.disablebtn();
    // this.http.get(UrlMaxSlot).subscribe(
    //   data => {
    // maxSlot = data;
    var showNumber = Number(this.lockernum)
    console.log("choose: " + showNumber);
    maxSlot = 9;
    // if (showNumber <= maxSlot.result && showNumber > 0) {
    if (showNumber <= maxSlot && showNumber > 0) {
      // console.log("/api/admin/lockerno/" + containerName + "/Locker " + this.lockernum);
      this.http.get("https://smartlocker.azurewebsites.net/api/admin/lockerno/" + containerName + "/Locker " + showNumber).subscribe(
        data => {
          IsAvailable = data;
          console.log(IsAvailable);
          if (IsAvailable == null) {
            if (this.lang == "thai") {
              document.getElementById("displayNum").innerHTML = "ไม่มีอุปกรณ์ในช่องนี้ กรุณาเลือกช่องอื่น";
            } else {
              document.getElementById("displayNum").innerHTML = "No item in this locker. Please enter again.";
            }
            this.ablebtn();
            this.lockernum = "";
          }
          else if (IsAvailable.loaner.employeeId == null) {
            this.http.get(Url + showNumber).subscribe(
              data => {
                console.log(data);
                this.checkLocker();
              }
            )
            this.http.get("https://smartlocker.azurewebsites.net/api/admin/borrow/" + IsAvailable.barcode + "/" + this.card_number).subscribe(
              data => {
                console.log(data);
              }
            )
            if (this.lang == "thai") {
              document.getElementById("numPad").innerHTML = "หยิบอุปกรณ์แล้วปิดบานช่อง";
            } else {
              document.getElementById("numPad").innerHTML = "Pick your item and close the door.";

            }
            document.getElementById("numPad").style.fontSize = "calc((.3em + 1vmin) + (.3em + 1vmax))"

          }
          else {
            if (this.lang == "thai") {
              document.getElementById("displayNum").innerHTML = "อุปกรณ์ไม่พร้อมให้ยืม กรุณาเลือกช่องอื่น";
            } else {
              document.getElementById("displayNum").innerHTML = "Item is not available.Please enter again";
            }

            this.ablebtn();
            // alert("this item is not available");
            this.lockernum = "";
          }
        }
      )
    }
    else {
      if (this.lang == "thai") {
        document.getElementById("displayNum").innerHTML = "ไม่มีช่องหมายเลข: " + showNumber + " กรุณาเลือกช่องอื่น";
      } else {
        document.getElementById("displayNum").innerHTML = "No Box number: " + showNumber + " Please enter again.";
      }

      this.ablebtn();
      this.lockernum = "";
    }

    // }
    // )
  }
  checkLocker() {
    delay(3000);
    this.http.get(Urlcheck + this.lockernum).subscribe(
      data => {
        detail = data;
        console.log("detail is " + detail.result);
        if (detail.result == 1) {
          // alert("close")
          alert("Thank you " + this.card_number + " Don't forget to logout");
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





