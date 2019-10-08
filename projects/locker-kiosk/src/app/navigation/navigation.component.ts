import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { delay } from 'q';
import { TypeResponse, TypeCategory, TypeSubcategory } from 'src/app/shared/model';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isHome: boolean = false;
  message: string;
  page_state = '';

  constructor(private location: Location,
    private http: HttpClient,
    private router: Router,
    private data: DataService,
  ) {
    setInterval(() => {//
      this.auto_logout();
    }, 1000);
    setInterval(() => {
      this.heartbeat();
    }, 60000 * 15);

  }

  lang = "";
  card_number = ""
  enterCheck = 1;
  serial_number = "";
  locker_num = "";
  locker_num_temp = "";
  door_close = 1;
  containerName = "";
  ngOnInit() {
    this.data.currentLocker.subscribe(contner => this.containerName = contner);
    this.data.currentLanguage.subscribe(message => this.lang = message);
    if (this.location.path() == '') {
      document.getElementById("logOutIcon").style.visibility = 'hidden';
      document.getElementById("logOut").innerHTML = "";
      document.getElementById("backBtn").style.visibility = 'hidden';
    }
    else {
      document.getElementById("backBtn").style.visibility = 'visible';
      document.getElementById("logOutIcon").style.visibility = 'visible';
    }

  }
  @HostListener('window:click', ['$event']) onClickHandler(event: MouseEvent) {
    time_out = 0;
    this.data.currentLanguage.subscribe(message => this.lang = message);
    if (this.lang == "thai") {
      this.to_thai();
    }
    else {
      this.to_eng();
    }

  }
  @HostListener('document:keydown', ['$event']) onkeydownHandler(event: KeyboardEvent) {
    if (event.key === "Enter") {
      // alert(this.card_number)
      // this.data.changeMessage(this.card_number);
      if (this.card_number.includes("_")) {
        if (this.card_number.includes("3721_") || this.card_number.includes("185_") || this.card_number == "_") {
          if (this.lang == "thai") {
            document.getElementById("ScanCard_sub").innerHTML = "ประมวลผล, รอซักครุ่";
          }
          else {
            document.getElementById("ScanCard_sub").innerHTML = "Processing, please wait";
          }
          if (this.enterCheck == 1) {
            this.http.post("https://smartlocker.azurewebsites.net/api/admin/finduser",{"BadgeId":this.card_number}).subscribe(
              data => {
                console.log(data);
                if (data != null) {
                  this.enterCheck = 0;
                  time_out = 0;
                  this.router.navigate(['/browse-option']);
                  document.getElementById("backBtn").style.visibility = 'visible';
                  document.getElementById("logOutIcon").style.visibility = 'visible';
                  document.getElementById("logOut").innerHTML = "ID: " + this.card_number + " Log out";
                  this.data.changeBadgeId(this.card_number);
                }
                else {
                  document.getElementById("ScanCard_sub").innerHTML = "User not found";
                  this.card_number = "";
                  this.serial_number = "";
                }
              }
            )
          }
        }
        else {
          if (this.lang == "thai") {
            document.getElementById("ScanCard_sub").innerHTML = "กรุณาใช้บัตรพนักงาน Esso";
          }
          else {
            document.getElementById("ScanCard_sub").innerHTML = "Please use ESSO ID card";
          }
          this.serial_number = "";
          this.card_number = "";
        }
      }
      else if (this.door_close == 1) {


        if (this.lang == "thai") {
          document.getElementById("ScanSerial_sub").innerHTML = "ประมวลผล, รอซักครุ่";
        }
        else {
          document.getElementById("ScanSerial_sub").innerHTML = "Processing, please wait";
        }
        console.log(this.serial_number)
        this.card_number = "";
        this.http.get<TypeResponse>('https://smartlocker.azurewebsites.net/api/admin/barcode/' + this.serial_number).subscribe(data => {
          detail = data;
          console.log(detail);
          if (detail != null && detail.loaner.employeeId != null) {
            this.locker_num_temp = detail.locker.name.toString();
            this.locker_num = this.locker_num_temp.substring(7);
            console.log("locker number: " + this.locker_num);
            this.http.get("/lockers/open/" + this.locker_num).subscribe(
              data => {
                console.log(data);
                this.door_close = 0;
                if (this.lang == "thai") {
                  document.getElementById("ScanSerial_sub").innerHTML = "คืนอุปกรณ์แล้วปิดประตูตู้";
                }
                else {
                  document.getElementById("ScanSerial_sub").innerHTML = "Return the item and close the door.";
                }
                this.checkLocker(this.locker_num);
              }
            );
          }
          else {
            // alert(this.serial_number+" : Not found");
            if (this.lang == "thai") {
              document.getElementById("ScanSerial_sub").innerHTML = "ไม่พบข้อมูลอุปกรณ์ กรุณาแสกนอุปกรณ์อื่น";
            }
            else {
              document.getElementById("ScanSerial_sub").innerHTML = "Item not found. Scan other item";
            }
            this.serial_number = "";
            this.card_number = "";
          }
        })
      }
    }
    else if (this.enterCheck == 1) {
      if ("1234567890_".includes(event.key)) {
        this.card_number = this.card_number + event.key;
      }
      if ("Shift".includes(event.key)) {
      }
      else {
        this.serial_number = this.serial_number + event.key;

      }
    }
  }

  back() {
    let LP = this.location.path();
    if (this.location.path() == '/browse-option') {
      document.getElementById("logOutIcon").style.visibility = 'hidden';
      document.getElementById("logOut").innerHTML = "";
      document.getElementById("backBtn").style.visibility = 'hidden';
      this.enterCheck = 1;
      this.card_number = "";
      this.router.navigate(['/']);
    }
    else if (LP == '/subcategory-option' || LP == '/item-option' || 'unit-option') {
      this.router.navigate(['/browse-option']);

    }
    else {
      this.location.back();
    }
  }
  out() {
    document.getElementById("logOutIcon").style.visibility = 'hidden';
    document.getElementById("logOut").innerHTML = "";
    document.getElementById("backBtn").style.visibility = 'hidden';
    this.enterCheck = 1;
    this.card_number = "";
    this.serial_number = "";
    this.router.navigate(['/']);
  }
  logoutword(lang) {
    if (lang == "thai") {
      return " ออกจากระบบ"
    }
    else {
      return " Log out"
    }
  }

  auto_logout() {
    time_out++;
    //console.log(time_out);
    if (time_out >= 30 * 9 && this.enterCheck == 0) {
      let time_left = 300 - time_out
      document.getElementById("logOut").innerHTML = "ID: " + this.card_number + " Log out | Auto log out in : " + time_left;
    }
    else if (time_out <= 30 * 9 && this.enterCheck == 0) {
      document.getElementById("logOut").innerHTML = "ID: " + this.card_number + this.logoutword(this.lang);
    }
    if (time_out >= 60 * 5) {
      if (this.enterCheck == 0) {
        this.out();
        // alert("log out");
      }
      time_out = 0;
    }

  }
  heartbeat() {
    this.http.get("https://heartbeatsl.azurewebsites.net/time/"+this.containerName).subscribe();
    this.http.get("https://heartbeatsl.azurewebsites.net").subscribe();

  }

  to_thai() {
    document.getElementById("backBtn_text").innerHTML = "กลับ"
  }
  to_eng() {
    document.getElementById("backBtn_text").innerHTML = "Back"
  }
  checkLocker(locker_num) {
    // console.log("ASSD" + locker_num);
    delay(3000);
    this.http.get("/lockers/checkclose/" + locker_num).subscribe(
      data => {
        detail = data;
        if (detail.result == 1) {
          // alert("close")
          console.log('https://smartlocker.azurewebsites.net/api/admin/return/' + this.serial_number);
          this.http.get<TypeResponse>('https://smartlocker.azurewebsites.net/api/admin/return/' + this.serial_number).subscribe();
          // alert("Thank you for returning : " + this.serial_number);
          if (this.lang == "thai") {
            document.getElementById("ScanSerial_sub").innerHTML = "ขอบคุณ เชิญแสกนอุปกรณ์ถัดไป";
          }
          else {
            document.getElementById("ScanSerial_sub").innerHTML = "Thank you.Scan other item";
          }
          this.door_close = 1;
          this.serial_number = "";
          this.card_number = "";
        }
        console.log(detail.categories);
      }
    )
  }
}
var detail;
var time_out = 0;
