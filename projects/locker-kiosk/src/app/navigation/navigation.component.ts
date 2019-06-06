import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isHome: boolean = false;

  constructor(private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd ) {
        this.isHome = event.url == '/'
      }
    });
  }

  back() {
    this.location.back()
  }

}
