import { Component, OnInit, HostListener } from '@angular/core';
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
    serial_number = "";
    locker_num = "";
    locker_num_temp = "";
    door_close = 1;
    lang = "";
    constructor(
        private router: Router,
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
    }
    @HostListener('document:keydown', ['$event']) onkeydownHandler(event: KeyboardEvent) {
        if (event.key === "Enter" && this.door_close == 1) {
            console.log(this.serial_number)
            if (this.lang == "thai") {
                document.getElementById("ScanSerial").innerHTML = "กรุณารอซักครู่";
            }
            else {
                document.getElementById("ScanSerial").innerHTML = "Processing, please wait";
            }
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
                                document.getElementById("ScanSerial").innerHTML = "คืนอุปกรณ์แล้วปิดบานช่อง";
                            }
                            else {
                                document.getElementById("ScanSerial").innerHTML = "Return the item and close the door.";
                            }
                            this.checkLocker(this.locker_num);
                        }
                    );
                }
                else {
                    // alert(this.serial_number+" : Not found");
                    // document.getElementById("ScanSerial").innerHTML = this.serial_number+" : Not found. Please Scan other item."; 
                    if (this.lang == "thai") {
                        document.getElementById("ScanSerial").innerHTML = "ไม่พบข้อมูลอุปกรณ์ กรุณาอุปกรณ์อื่น";
                    }
                    else {
                        document.getElementById("ScanSerial").innerHTML = "Item not found. Please Scan other item";
                    }
                    this.serial_number = "";
                }
            })
        }
        else if (this.door_close == 1) {
            if ("Shift".includes(event.key)) {
            }
            else {
                this.serial_number = this.serial_number + event.key;

            }
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
                    console.log('https://smartlocker.azurewebsites.net/api/admin/return/' + this.serial_number);
                    this.http.get<TypeResponse>('https://smartlocker.azurewebsites.net/api/admin/return/' + this.serial_number).subscribe();
                    // alert("Thank you for returning : " + this.serial_number);
                    if (this.lang == "thai") {
                        document.getElementById("ScanSerial").innerHTML = "ขอบคุณ เชิญแสกนอุปกรณ์ถัดไป";
                    }
                    else {
                        document.getElementById("ScanSerial").innerHTML = "Thank you.Scan other item ";
                    }
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

    tothai() {
        document.getElementById("ScanSerial").innerHTML = "แสกนบาร์โค๊ดบนอุปกรณ์เพื่อคืน";
    }
    toeng() {
        document.getElementById("ScanSerial").innerHTML = "Scan barcore on item to return";
    }
}
var detail;