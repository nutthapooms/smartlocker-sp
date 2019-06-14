import { Component, OnInit } from '@angular/core';
// import { DataService} from '../data.service';
@Component({
  selector: 'app-browse-option',
  templateUrl: './browse-option.component.html',
  styleUrls: ['./browse-option.component.scss']
})
export class BrowseOptionComponent implements OnInit {
  message: string;
  constructor(
    // private data : DataService
    ) { }

  ngOnInit() {
    // this.data.currentMessage.subscribe(message=> this.message = message);
  }

}
