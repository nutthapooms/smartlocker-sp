import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
@Component({
  selector: 'app-browse-option',
  templateUrl: './browse-option.component.html',
  styleUrls: ['./browse-option.component.scss']
})
export class BrowseOptionComponent implements OnInit {
  message: string;
  constructor(
     private language : DataService
    ) { }
  lang = "";
  ngOnInit() {
    // this.data.currentMessage.subscribe(message=> this.message = message);
    this.language.currentLanguage.subscribe(message => {
      this.lang = message
      if(this.lang =="thai"){
        this.tothai();
      }
    });

  }
  tothai(){
    document.getElementById("return").innerHTML = "คืนอุปกรณ์";
    document.getElementById("report").innerHTML = "แจ้งปัญหา";
    document.getElementById("choosecat").innerHTML = "เลือกประเภทอุปกณ์";
    document.getElementById("chooselock").innerHTML = "เลือกช่อง";

  }

}
