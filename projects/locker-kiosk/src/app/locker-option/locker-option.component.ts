import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, async } from 'q';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { DataService } from '../data.service';
import { UnitDTO } from 'src/app/shared/model';
import { AlertService } from '../alert.service';

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
  containerName: string;
  constructor(private http: HttpClient, private route: ActivatedRoute,
    private data: DataService,
    private alrt: AlertService,
    private router: Router, ) { }

  ngOnInit() {
    this.data.currentLocker.subscribe(contner => this.containerName = contner);
    this.data.currentBadgeId.subscribe(message => this.card_number = message);
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
  addnum(num: number) {
    // let strNum = stringify(num);
    this.lockernum = this.lockernum + num;
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
    this.http.get(UrlMaxSlot).subscribe(
      data => {
        maxSlot = data;
        var showNumber = Number(this.lockernum)
        console.log("choose: " + showNumber);
        // maxSlot = 34;
        if (showNumber <= maxSlot.result && showNumber > 0) {
          // if (showNumber <= maxSlot && showNumber > 0) {
          // console.log("/api/admin/lockerno/" + containerName + "/Locker " + this.lockernum);
          this.http.get("https://smartlocker20220922110147.azurewebsites.net/api/admin/lockerno/" + this.containerName + "/Locker " + showNumber).subscribe(
            data => {
              IsAvailable = data;
              console.log(IsAvailable);
              if (this.card_number == "85203721_226000") {
                this.http.get('/lockers/open/' + showNumber).subscribe(
                  data => {
                    console.log(data);
                    this.ablebtn();
                  }
                )
              }
              else if (IsAvailable == null) {
                if (this.lang == "thai") {
                  document.getElementById("displayNum").innerHTML = "ไม่มีอุปกรณ์ในช่องนี้ กรุณาเลือกช่องอื่น";
                } else {
                  document.getElementById("displayNum").innerHTML = "No item in this locker. Please enter again.";
                }
                this.ablebtn();
                this.lockernum = "";
              }
              else if (IsAvailable.loaner.employeeId == null) {
                this.http.post<UnitDTO>("https://smartlocker20220922110147.azurewebsites.net/api/admin/borrow/" + IsAvailable.barcode, { "BadgeId": this.card_number }).subscribe(
                  data => {
                    let returnday = data.item.defaultDuration / (24 * 60 * 60);
                    this.alrt.dateAlert("กรุณาคืนอุปกรณ์ภายใน " + returnday + " วัน Please return the item in " + returnday + " days", 10000);
                    console.log(data);
                    this.http.get('/lockers/open/' + showNumber).subscribe(
                      data => {
                        console.log(data);
                        this.checkLocker();
                      }
                    )
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

      }
    )
  }
  openAll() {
    let i = 1;
    for (i = 1; i < 35; i++) {
      this.http.get(Url + i).subscribe(
        data => {
          console.log("open" + i)
        }
      )
      delay(2000);
    }
  }
  checkLocker() {
    delay(3000);
    this.http.get('/lockers/checkclose/' + this.lockernum).subscribe(
      data => {
        detail = data;
        console.log("detail is " + detail.result);
        //datail.result = 1;
        if (detail.result == 1) {
          // alert("close")
          // alert("Thank you " + this.card_number + " Don't forget to logout");
          // this.alert_message();
          this.router.navigate(['/browse-option'])
        }
        console.log(data);
      }
    )
    this.lockernum = "";
  }

  alert_message() {
    if (this.lang == "thai") {
      alert("ขอบคุณ " + this.card_number + " อย่าลืมออกจากระบบ")
    }
    else {
      alert("Thank you " + this.card_number + " Don't forget to logout");
    }
  }
}
var serial_number = ""
var detail;
var maxSlot;
var IsAvailable;
const Url = '/lockers/open/';
const Urlcheck = '/lockers/checkclose/';
const UrlMaxSlot = '/lockers/maxSlot/';





