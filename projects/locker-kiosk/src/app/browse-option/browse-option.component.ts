import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
@Component({
  selector: 'app-browse-option',
  templateUrl: './browse-option.component.html',
  styleUrls: ['./browse-option.component.scss']
})
export class BrowseOptionComponent implements OnInit {
  message: string;
  lang = "";

  constructor(
     private language : DataService
    ) { 
      this.language.currentLanguage.subscribe(message => {
        this.lang = message
        if(this.lang =="thai"){
          this.tothai();
        }
        else{
          this.toeng();
        }
      });
    }
  ngOnInit() {
    this.language.currentLanguage.subscribe(message => {
      this.lang = message
      if(this.lang =="thai"){
        this.tothai();
      }
      else{
        this.toeng();
      }
    });

  }
  tothai(){
    document.getElementById("viewall").innerHTML = "ดูอุปกรณ์ทั้งหมด";
    document.getElementById("return").innerHTML = "คืนอุปกรณ์";
    // document.getElementById("report").innerHTML = "แจ้งปัญหา";
    document.getElementById("choosecat").innerHTML = "เลือกประเภทอุปกรณ์";
    document.getElementById("chooselock").innerHTML = "เลือกช่อง";
    document.getElementById("menu").innerHTML = "เมนู";
    document.getElementById("submenu").innerHTML = "ยินดีต้อนรับ";
  }
  toeng(){
    document.getElementById("return").innerHTML = "Return Item";
    document.getElementById("viewall").innerHTML = "View all Items";
    // document.getElementById("report").innerHTML = "Report Issue";
    document.getElementById("choosecat").innerHTML = "Choose Categories";
    document.getElementById("chooselock").innerHTML = "Choose Locker";
    document.getElementById("menu").innerHTML = "Menu";
    document.getElementById("submenu").innerHTML = "Welcome";
  }

}
