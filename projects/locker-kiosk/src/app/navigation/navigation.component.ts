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
    private pagestate: DataService

  ) { }
  card_number = ""
  enterCheck = 1;
  serial_number = "";
  locker_num = "";
  locker_num_temp = "";
  door_close = 1;
  ngOnInit() {
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
  @HostListener('document:keydown', ['$event']) onkeydownHandler(event: KeyboardEvent) {
    if (event.key === "Enter") {
      // alert(this.card_number)
      // this.data.changeMessage(this.card_number);
      if (this.card_number.includes("_")) {
        if (this.enterCheck == 1) {
          document.getElementById("backBtn").style.visibility = 'visible';
          document.getElementById("logOutIcon").style.visibility = 'visible';
          document.getElementById("logOut").innerHTML = "ID: " + this.card_number + " Log out";
          this.data.changeMessage(this.card_number);
          this.http.get("/api/admin/finduser/" + this.card_number).subscribe(
            data => {
              console.log(data);
            }
          )
          this.enterCheck = 0;
          this.router.navigate(['/browse-option']);
        }
      }
      else if (this.door_close == 1) {
        document.getElementById("ScanSerial_sub").innerHTML = "Processing, please wait";
        console.log(this.serial_number)
        this.http.get<TypeResponse>('/api/admin/barcode/' + this.serial_number).subscribe(data => {
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
                document.getElementById("ScanSerial_sub").innerHTML = "Return the item and close the door.";
                this.checkLocker(this.locker_num);
              }
            );
          }
          else {
            // alert(this.serial_number+" : Not found");
            document.getElementById("ScanSerial_sub").innerHTML = "Item not found. Scan other item";
            this.serial_number = "";
            this.card_number = "";
          }
        })
      }
    }
    else {
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
    if (this.location.path() == '/browse-option') {
      document.getElementById("logOutIcon").style.visibility = 'hidden';
      document.getElementById("logOut").innerHTML = "";
      document.getElementById("backBtn").style.visibility = 'hidden';
      this.enterCheck = 1;
      this.card_number = "";
      this.router.navigate(['/']);
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
    this.serial_number ="";
    this.router.navigate(['/']);
  }
  checkLocker(locker_num) {
    // console.log("ASSD" + locker_num);
    delay(3000);
    this.http.get("/lockers/checkclose/" + locker_num).subscribe(
      data => {
        detail = data;
        if (detail.result == 1) {
          // alert("close")
          console.log('/api/admin/return/' + this.serial_number);
          this.http.get<TypeResponse>('/api/admin/return/' + this.serial_number).subscribe();
          // alert("Thank you for returning : " + this.serial_number);
          document.getElementById("ScanSerial_sub").innerHTML = "Thank you.Scan other item";
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

