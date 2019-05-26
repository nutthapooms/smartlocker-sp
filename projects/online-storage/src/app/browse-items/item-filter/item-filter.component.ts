import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CountryResponse, SiteResponse, ContainerResponse, LockerResponse } from 'src/app/shared/model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.scss']
})
export class ItemFilterComponent implements OnInit {
  countryId: number = -1;
  siteId: number = -1;
  containerId: number = -1;
  lockerId: number = -1;

  countries: Array<CountryResponse> = null;
  sites: Array<SiteResponse> = null;
  containers: Array<ContainerResponse> = null;
  lockers: Array<LockerResponse> = null;

  constructor(private http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.fetchCountires();
    this._route.queryParams.subscribe(queries => {
      if (queries.countryId) this.countryId = queries.countryId;
      if (queries.siteId) this.siteId = queries.siteId;
      if (queries.containerId) this.lockerId = queries.containerId;
    })
  }


  fetchCountires() {
    let endpoint = `http://52.163.226.37/api/countries`
    console.log("Fetching containers...", endpoint)
    this.http.get<Array<CountryResponse>>(endpoint).subscribe(data => {
      this.countries = data
      console.log(data)
    }

    )
  }


  changeParams() {
    if (this.countryId > -1) { this.sites = this.countries.find(each => each.id == this.countryId).sites } else { this.sites = null; this.siteId = -1 }
    if (this.siteId > -1) { this.containers = this.sites.find(each => each.id == this.siteId).containers } else { this.containers = null; this.containerId = -1 }
    if (this.containerId > -1) { this.lockers = this.containers.find(each => each.id == this.containerId).lockers } else { this.lockers = null; this.lockerId = -1 }


    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        countryId: this.countryId,
        siteId: this.siteId,
        containerId: this.containerId,
        lockerId: this.lockerId
      },
      queryParamsHandling: 'merge',
    });
  }
}
