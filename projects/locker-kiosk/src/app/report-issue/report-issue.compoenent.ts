import { Component, OnInit } from '@angular/core';
// import { DataService} from '../data.service';
@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.scss']
})
export class ReportIssueComponent implements OnInit {
  message: string;
  constructor(
    // private data : DataService
    ) { }

  ngOnInit() {
    // this.data.currentMessage.subscribe(message=> this.message = message);
  }

}
