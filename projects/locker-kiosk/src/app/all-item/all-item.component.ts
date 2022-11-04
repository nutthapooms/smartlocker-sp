import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend, HttpParams } from '@angular/common/http';
import { UnitDTO, LockerDTO, ContainerDTO } from 'src/app/shared/model';
import { DataService } from '../data.service'
import { Router } from '@angular/router';
import { delay } from 'q';
import { AlertService } from '../alert.service';


@Component({
  selector: 'app-all-item',
  templateUrl: './all-item.component.html',
  styleUrls: ['./all-item.component.scss']
})
export class AllItemComponent implements OnInit {
  units: UnitDTO[] = [];
  containerId: number;
  containerName: string;
  lang: string;
  chooseLocker: string;
  cardNumber: string;
  test = [1, 2, 3, 4, 5, 6, 6, 7]
  constructor(
    private http: HttpClient,
    private router: Router,
    private alrt: AlertService,
    private data: DataService

  ) { }

  ngOnInit() {
    this.data.currentBadgeId.subscribe(badgeid => this.cardNumber = badgeid);
    this.data.currentLanguage.subscribe(language => {
      this.lang = language
      if (this.lang == "thai") {
        this.tothai();
      }
      else {
        this.toeng();
      }
    });
    this.data.currentLocker.subscribe(data => {
      this.http.get<ContainerDTO>(`https://smartlocker20220922110147.azurewebsites.net/api/admin/containers/name/${data}`).subscribe(id => {
        this.containerId = id.id;
        this.containerName = data;
        let params = new HttpParams();
        if (this.containerId) params = params.append('containerId', this.containerId.toString());
        this.http.get<Array<UnitDTO>>('https://smartlocker20220922110147.azurewebsites.net/api/admin/units/container', { params: params }).subscribe(data => {
          let tempUnits = data;
          document.getElementById("body").innerHTML = "";
          tempUnits.forEach(element => {
            if (element.loaner.employeeId == null) {
              this.units.push(element);
            }
            console.log(this.units);
          });
        }
        )
      })
    })

  }
  checkReserve(reserveUserId){
    return ((reserveUserId == this.cardNumber) || !reserveUserId)
  }

  openLocker(l) {
    this.chooseLocker = l;
    if (this.lang == "thai") {
      document.getElementById("status").innerHTML = "กรุณารอซักครู่";
    } else {
      document.getElementById("status").innerHTML = "Processing, please wait.";
    }
    document.getElementById("allitem-option").style.visibility = 'hidden';
    console.log("choose: " + this.chooseLocker);
    var showNumber = this.chooseLocker.substring(7);
    this.http.get("https://smartlocker20220922110147.azurewebsites.net/api/admin/lockerno/" + this.containerName + "/" + this.chooseLocker).subscribe(
      data => {
        IsAvailable = data;
        console.log(IsAvailable);
        if (this.cardNumber == "85203721_226000") {
          this.http.get(Url + showNumber).subscribe(
            data => {
              console.log(data);
            }
          )
        }
        else if (IsAvailable.loaner.employeeId == null) {
          this.http.post<UnitDTO>("https://smartlocker20220922110147.azurewebsites.net/api/admin/borrow/" + IsAvailable.barcode,{"BadgeId": this.cardNumber}).subscribe(
            data => {
              console.log(data);
              let returnday = data.item.defaultDuration/(24*60*60);
              // this.alrt.dateAlert("กรุณาคืนอุปกรณ์ภายใน " + returnday +" วัน Please return the item in "+ returnday +" days",10000);              
              this.http.get(Url + showNumber).subscribe(
                data => {
                  console.log(data);
                  this.checkLocker();
                }
              ) 
            }
          )
          

          if (this.lang == "thai") {
            document.getElementById("status").innerHTML = "หยิบอุปกรณ์แล้วปิดบานช่อง";
          } else {
            document.getElementById("status").innerHTML = "Pick your item and close the door.";

          }
          document.getElementById("status").style.fontSize = "calc((.3em + 1vmin) + (.3em + 1vmax))"

        }
        else {
          if (this.lang == "thai") {
            document.getElementById("status").innerHTML = "อุปกรณ์ไม่พร้อมให้ยืม กรุณาเลือกช่องอื่น";
          } else {
            document.getElementById("status").innerHTML = "Item is not available.Please enter again";
          }
          // alert("this item is not available");
          document.getElementById("allitem-option").style.visibility = 'visible';

          this.chooseLocker = "";
        }
      }
    )
  }

  checkLocker() {
    delay(3000);
    var showNumber = this.chooseLocker.substring(7);
    this.http.get(Urlcheck + showNumber).subscribe(
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
    this.chooseLocker = "";
  }

  alert_message() {
    if (this.lang == "thai") {
      alert("ขอบคุณ " + this.cardNumber + " อย่าลืมออกจากระบบ")
    }
    else {
      alert("Thank you " + this.cardNumber + " Don't forget to logout");
    }

  }
  tothai() {
    document.getElementById("title").innerHTML = "อุปกรณ์ทั้งหมด"
    document.getElementById("status").innerHTML = "อุปกรณ์ใดที่คุณต้องการ"
  }
  toeng() {
    document.getElementById("title").innerHTML = "All Items"
    document.getElementById("status").innerHTML = "What item do you want?"
  }
}
var detail;
var IsAvailable;
const Url = '/lockers/open/';
const Urlcheck = '/lockers/checkclose/';

