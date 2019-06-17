import { Component, OnInit, HostListener } from '@angular/core';
// import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-return-items',
  templateUrl: './return-items.component.html',
  styleUrls: ['./return-items.component.scss']
})
export class ReturnItemsComponent implements OnInit {
  page_state = '/return-items';
  constructor(
    private router: Router,
    private pagestate: DataService

    // private data: DataService
  ) { }
  ngOnInit() {
    this.pagestate.changeMessage(this.page_state);
    console.log(this.page_state);
  }
  return (){
    this.router.navigate(['/'])
  }
  
}
