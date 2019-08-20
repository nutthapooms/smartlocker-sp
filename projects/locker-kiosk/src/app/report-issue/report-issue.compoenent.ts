import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
// import { DataService} from '../data.service';
@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.scss']
})
export class ReportIssueComponent implements OnInit {
  lang: string;
  
  constructor(
    private language: DataService,
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
  tothai(){
    document.getElementById("Title").innerHTML = "แจ้งปัญหา";
    document.getElementById("SubTitle").innerHTML = "อะไรเป็นปัญหาของคุณ";
    document.getElementById("ItemIssue").innerHTML = "อุปกรณ์ทีปัญหา(ยังไม่พร้อมใช้งาน)";
    document.getElementById("ItemIsThere").innerHTML = "มีอุปกรณ์ในช่องแต่ยืมไม่ได้";

  }
  toeng(){
    document.getElementById("Title").innerHTML = "Report Issue";
    document.getElementById("SubTitle").innerHTML = "what is the problem?";
    document.getElementById("ItemIssue").innerHTML = "Item has an issue (Not Available)";
    document.getElementById("ItemIsThere").innerHTML = "Item is there, But can't Borrow";

  }

}
