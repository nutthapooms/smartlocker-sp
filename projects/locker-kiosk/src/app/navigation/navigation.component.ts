import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataService} from '../data.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isHome: boolean = false;
  message : string;
  constructor(private location: Location,
    private router: Router,
    // private data : DataService
    ) { }

  ngOnInit() {
    // this.data.currentMessage.subscribe(message=> this.message = message);
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd ) {
        this.isHome = event.url == '/'
      }
    });
  }

  back() {
    this.location.back()
  }
  out() {
    this.router.navigate(['/'])
    
  }

}
