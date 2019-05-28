import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Array<BreadCrumb> = new Array<BreadCrumb>();
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
     this.router.events.subscribe(event => {
       if(event instanceof NavigationEnd) {
         console.log(event)
         this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root)
         console.log(this.breadcrumbs)

       }
     })

  }
  buildBreadCrumb(route: ActivatedRoute, url: string = '',
                breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    //If no routeConfig is avalailable we are on the root path
    const label = route.routeConfig ? route.routeConfig.data[ 'breadcrumb' ] : 'Home';
    const path = route.routeConfig ? route.routeConfig.path : '';
    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
        label: label,
        url: nextUrl
    };
    const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
    if (route.firstChild) {
        //If we are not on our current path yet,
        //there will be more children to look after, to build our breadcumb
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
}

}


export interface BreadCrumb {
  label: string;
  url: string;
};
