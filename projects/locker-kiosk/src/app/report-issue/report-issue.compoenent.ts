import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../data.service';
import { delay } from 'q';
import { HttpClient } from '@angular/common/http';
import { TypeResponse, TypeCategory, TypeSubcategory } from 'src/app/shared/model';


@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.scss']
})
export class ReportIssueComponent implements OnInit {
  lang: string;
  serial_number = "";
  locker_num = "";
  locker_num_temp = "";
  door_close = 1;

  constructor(
    private http: HttpClient,
    private language: DataService
  ) { }

  ngOnInit() {
    this.language.currentLanguage.subscribe(message => {
      this.lang = message
      if (this.lang == "thai") {
        this.tothai();
      }
      else {
        this.toeng();
      }
    });
    // this.data.currentMessage.subscribe(message=> this.message = message);
  }
  @HostListener('document:keydown', ['$event']) onkeydownHandler(event: KeyboardEvent) {
    if (event.key === "Enter" && this.door_close == 1) {
      console.log(this.serial_number)
      if (this.lang == "thai") {
        document.getElementById("SubTitle").innerHTML = "กรุณารอซักครู่";
      }
      else {
        document.getElementById("SubTitle").innerHTML = "Processing, please wait";
      }
      this.http.get<TypeResponse>('https://smartlocker.azurewebsites.net/api/admin/barcode/' + this.serial_number).subscribe(data => {
        detail = data;
        console.log(detail);
        if (detail != null) {
          this.locker_num_temp = detail.locker.name.toString();
          this.locker_num = this.locker_num_temp.substring(7);
          console.log("locker number: " + this.locker_num);
          this.http.get("/lockers/open/" + this.locker_num).subscribe(
            data => {
              console.log(data);
              // this.door_close = 0;
              if (this.lang == "thai") {
                document.getElementById("SubTitle").innerHTML = "ใส่อุปกรณ์ช่อง "+ this.locker_num;
              }
              else {
                document.getElementById("SubTitle").innerHTML = "Return the item at locker "+ this.locker_num;
              }
              // this.checkLocker(this.locker_num);
              this.serial_number = "";
            }
          );
        }
        else {
          // alert(this.serial_number+" : Not found");
          // document.getElementById("ScanSerial").innerHTML = this.serial_number+" : Not found. Please Scan other item."; 
          if (this.lang == "thai") {
            document.getElementById("SubTitle").innerHTML = "ไม่พบข้อมูลอุปกรณ์ กรุณาอุปกรณ์อื่น";
          }
          else {
            document.getElementById("SubTitle").innerHTML = "Item not found. Please Scan other item";
          }
          this.serial_number = "";
        }
      })
    }
    else if (this.door_close == 1) {

      if ("Shift".includes(event.key)) {
      }
      else if ("/".includes(event.key)) {
        this.serial_number = this.serial_number + "-"
      }
      else {
        this.serial_number = this.serial_number + event.key;

      }
    }
  }
  // checkLocker(locker_num) {
  //   // console.log("ASSD" + locker_num);
  //   delay(3000);
  //   this.http.get("/lockers/checkclose/" + locker_num).subscribe(
  //     data => {
  //       detail = data;
  //       if (detail.result == 1) {
  //         // alert("close")
  //         console.log('https://smartlocker.azurewebsites.net/api/admin/return/' + this.serial_number);
  //         this.http.get<TypeResponse>('https://smartlocker.azurewebsites.net/api/admin/return/' + this.serial_number).subscribe();
  //         // alert("Thank you for returning : " + this.serial_number);
  //         if (this.lang == "thai") {
  //           document.getElementById("ScanSerial").innerHTML = "ขอบคุณ เชิญแสกนอุปกรณ์ถัดไป";
  //         }
  //         else {
  //           document.getElementById("ScanSerial").innerHTML = "Thank you.Scan other item ";
  //         }
  //         this.door_close = 1;
  //         this.serial_number = "";
  //       }
  //       console.log(detail.categories);
  //     }
  //   )
  // }
  tothai() {
    document.getElementById("Title").innerHTML = "แจ้งปัญหา";
    document.getElementById("SubTitle").innerHTML = "อะไรเป็นปัญหาของคุณ แสกนบาร์โค๊ดเพื่อเพิ่มของ";
    document.getElementById("ItemIssue").innerHTML = "อุปกรณ์ทีปัญหา(ยังไม่พร้อมใช้งาน)";
    document.getElementById("ItemIsThere").innerHTML = "มีอุปกรณ์ในช่องแต่ยืมไม่ได้";
    document.getElementById("addUser").innerHTML = "เพิ่มผู้ใช้";
  }
  toeng() {
    document.getElementById("addUser").innerHTML = "Add User";
    document.getElementById("Title").innerHTML = "Report Issue";
    document.getElementById("SubTitle").innerHTML = "what is the problem?";
    document.getElementById("ItemIssue").innerHTML = "Item has an issue (Not Available)";
    document.getElementById("ItemIsThere").innerHTML = "Item is there, But can't Borrow";

  }

}
var detail;
