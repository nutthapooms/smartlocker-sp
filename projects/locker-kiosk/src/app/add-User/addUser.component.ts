import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../data.service';
import { delay } from 'q';
import { HttpClient } from '@angular/common/http';
import { TypeResponse, TypeCategory, TypeSubcategory } from 'src/app/shared/model';
import badgeInfo from '../badgeInfo.json'

@Component({
    selector: 'app-add-User',
    templateUrl: './addUser.component.html',
    styleUrls: ['./addUser.component.scss']
})
export class AddUserComponent implements OnInit {
    lang: string;
    locker_num = "";
    locker_num_temp = "";
    door_close = 1;
    userr = [];
    card_number = ""
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
    addUser(input: string) {
        let inputt = input.toString().split("_");
        // console.log(inputt[1]);
        badgeInfo.push([inputt[1], "not set", "not set", "no", "no", "KioskaddedUser"])
        // console.log(this.userr[0][1]);
        this.userr = badgeInfo.filter(badge => badge[0] == inputt[1]);
        if (this.findUser(this.card_number)) {
            document
        }
        else {

            return false
        }
    }
    findUser(input: string) {
        let inputt = input.toString().split("_");
        // console.log(inputt[1]);
        this.userr = badgeInfo.filter(badge => badge[0] == inputt[1]);
        // console.log(this.userr[0][1]);
        if (this.userr[0] != null) {
            document.getElementById("ScanCard").innerHTML = "เพิ่มผู้ใช้สำเร็จ";
            return true
        }
        else {
            document.getElementById("ScanCard").innerHTML = "เพิ่มผู้ใช้ไม้สำเร็จ";
            return false
        }
    }
    @HostListener('document:keydown', ['$event']) onkeydownHandler(event: KeyboardEvent) {
        if (event.key === "Enter") {
            alert(this.card_number)
            // this.data.changeMessage(this.card_number);
            if (this.card_number.includes("_")) {
                if (this.card_number.includes("_") || this.card_number == "_") {
                    if (this.lang == "thai") {
                        document.getElementById("ScanCard").innerHTML = "ประมวลผล, รอซักครุ่";
                    }
                    else {
                        document.getElementById("ScanCard").innerHTML = "Processing, please wait";
                    }
                    this.addUser(this.card_number);
                    this.card_number = "";
                }
                else {
                    if (this.lang == "thai") {
                        document.getElementById("ScanCard").innerHTML = "กรุณาใช้บัตรพนักงาน Esso";
                    }
                    else {
                        document.getElementById("ScanCard").innerHTML = "Please use ESSO ID card";
                    }
                    this.card_number = "";
                }
            }
        }
        else  {
            if ("1234567890_".includes(event.key)) {
              this.card_number = this.card_number + event.key;
            }
            if ("Shift".includes(event.key)) {
            }
            
          }
    }
    tothai() {
        document.getElementById("ScanCard").innerHTML = "ส่องบัตรพนักงาน";

    }
    toeng() {
        document.getElementById("ScanCard").innerHTML = "Scan new user ID card";

    }
}