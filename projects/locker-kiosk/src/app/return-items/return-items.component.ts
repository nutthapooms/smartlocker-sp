import { Component, OnInit, HostListener } from '@angular/core';
// import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { TypeResponse, TypeCategory, TypeSubcategory } from 'src/app/shared/model';
import { delay } from 'q';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
    selector: 'app-return-items',
    templateUrl: './return-items.component.html',
    styleUrls: ['./return-items.component.scss']
})
export class ReturnItemsComponent implements OnInit {
    // page_state = '/return-items';
    serial_number = "";
    locker_num = "";
    locker_num_temp = "";
    door_close = 1;
    constructor(
        private router: Router,
        // private pagestate: DataService,
        private http: HttpClient
        // private data: DataService
    ) { }
    ngOnInit() {

        // this.pagestate.changeMessage(this.page_state);
        // console.log(this.page_state);
    }
    @HostListener('document:keydown', ['$event']) onkeydownHandler(event: KeyboardEvent) {
        if (event.key === "Enter" && this.door_close == 1) {
            // alert(this.serial_number)
            this.http.get<TypeResponse>('http://http://192.168.1.34:8080/api/admin/barcode/' + this.serial_number).subscribe(data => {
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
                    // document.getElementById("ScanSerial").innerHTML = this.serial_number+" : Not found. Please Scan other item."; 
                    document.getElementById("ScanSerial_sub").innerHTML = "Item not found. Please Scan other item or tap to cancel.";

                    this.serial_number = "";
                }
            })
        }
        else if(this.door_close == 1){
            this.serial_number = this.serial_number + event.key;
        }
    }
    checkLocker(locker_num) {
        // console.log("ASSD" + locker_num);
        delay(3000);
        this.http.get("/lockers/checkclose/" + locker_num).subscribe(
            data => {
                detail = data;
                if (detail.result == 1) {
                    // alert("close")
                    console.log('http://http://192.168.1.34:8080/api/admin/return/' + this.serial_number);
                    this.http.get<TypeResponse>('http://http://192.168.1.34:8080/api/admin/return/' + this.serial_number).subscribe();
                    // alert("Thank you for returning : " + this.serial_number);
                    document.getElementById("ScanSerial_sub").innerHTML = "Thank you.Scan other item or tap to cancel.";
                    this.door_close = 1;
                    this.serial_number = "";
                }
                console.log(detail.categories);
            }
        )
    }
    return() {
        this.router.navigate(['/'])
    }
}
var detail;