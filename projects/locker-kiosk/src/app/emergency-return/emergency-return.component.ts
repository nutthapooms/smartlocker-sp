import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { detachEmbeddedView } from '@angular/core/src/view';
import { delay } from 'q';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { DataService } from '../data.service';
// import { DataService} from '../data.service';
@Component({
  selector: 'app-emergency-return',
  templateUrl: './emergency-return.component.html',
  styleUrls: ['./emergency-return.component.scss']
})
export class EmergencyReturnComponent implements OnInit {
    lockernum = "";
    card_number: string;
    checkopen = 0;
    constructor(private http: HttpClient, private route: ActivatedRoute,
      private data: DataService,
      private router: Router, ) { }
  
    ngOnInit() {
      this.data.currentBadgeId.subscribe(message => this.card_number = message);
      this.data.currentLocker.subscribe(conter => containerName = conter);
    }
    addnum(num = "") {
      this.lockernum = this.lockernum + num
      document.getElementById("displayNum").innerHTML = "Box number :" + this.lockernum;
    }
    delnum() {
      this.lockernum = this.lockernum.slice(0, -1);
      document.getElementById("displayNum").innerHTML = "Box number :" + this.lockernum;
    }
    disablebtn(){
      for(var i=0;i<12;i++){
      (document.getElementsByClassName("numpad")[i]as HTMLButtonElement).disabled = true;
      }
      
    }
    ablebtn(){
      for(var i=0;i<12;i++){
      (document.getElementsByClassName("numpad")[i]as HTMLButtonElement).disabled = false;
      }
    }
    emergencyReturn() {
      document.getElementById("displayNum").innerHTML = "Processing, please wait.";
      this.disablebtn();
    //   this.http.get(UrlMaxSlot).subscribe(
            // data => {
        //   maxSlot = data;
          maxSlot = 9;
          var showNumber = Number(this.lockernum) 
          console.log("choose: "+showNumber);
        //   if (showNumber <= maxSlot.result && showNumber > 0) {
          if (showNumber <= maxSlot && showNumber > 0) {
            // console.log("/api/admin/lockerno/" + containerName + "/Locker " + this.lockernum);
            this.http.get("https://smartlocker.azurewebsites.net/api/admin/lockerno/" + containerName + "/Locker " + showNumber).subscribe(
              data => {
                IsAvailable = data;
                console.log(IsAvailable);
                if (IsAvailable == null){
                  document.getElementById("displayNum").innerHTML = "No item in this locker. Please enter again.";
                  this.ablebtn();
                  this.lockernum = "";
                } 
                else {
                    this.http.get("https://smartlocker.azurewebsites.net/api/admin/return/" + IsAvailable.barcode).subscribe(
                    data => {
                      console.log(data);
                    }
                  )
                  document.getElementById("displayNum").innerHTML = "System has update an item status. <br/>Try borrow it again";
                  this.ablebtn();
                  // alert("this item is not available");
                  this.lockernum = "";
                }
              }
            )
          }
          else {
            document.getElementById("displayNum").innerHTML = "No Box number: " + showNumber + " Please enter again.";
            this.ablebtn();
            this.lockernum = "";
          }
  
        //}
    //   )
    }
  }
  var serial_number = ""
  var detail;
  var maxSlot;
  var IsAvailable;
  const Url = '/lockers/open/';
  const Urlcheck = '/lockers/checkclose/';
  const UrlMaxSlot = '/lockers/maxSlot/';
  var containerName;
  
  
  
