import { Component, OnInit, HostListener } from '@angular/core';
// import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-return-items',
    templateUrl: './return-items.component.html',
    styleUrls: ['./return-items.component.scss']
})
export class ReturnItemsComponent implements OnInit {
    page_state = '/return-items';
    serial_number = "";
    constructor(
        private router: Router,
        private pagestate: DataService,
        private http: HttpClient
        // private data: DataService
    ) { }
    ngOnInit() {
        this.pagestate.changeMessage(this.page_state);
        console.log(this.page_state);
    }
    @HostListener('document:keydown', ['$event']) onkeydownHandler(event: KeyboardEvent) {
        if (event.key === "Enter") {
            alert(this.serial_number)
            this.http.get("/lockers/open/3").subscribe(
                data =>{
                    console.log(data);
                }
            );
            this.checkLocker();
            this.serial_number = "";    

        }
        else {
            if ("1234567890_".includes(event.key)) {
                this.serial_number = this.serial_number + event.key;
            }
        }


    }
    checkLocker() {
        this.http.get("/lockers/checkclose/3").subscribe(
          data => {
            detail = data;
            console.log("detail is " + detail.result);
            if (detail.result == 1) {
              // alert("close")
              alert("Thank you for returning : "+this.serial_number);
            }
            console.log(data);
          }
        )
        // this.lockernum = "";
      }
    return() {
        this.router.navigate(['/'])
    }

}
var detail;