import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CountryResponse, SiteResponse, ContainerResponse, LockerResponse, LocationResponse, LocationCountry, LocationSite, LocationContainer, LocationLocker } from 'src/app/shared/model';
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

  locations: LocationResponse;

  countries: Array<LocationCountry> = null;
  sites: Array<LocationSite> = null;
  containers: Array<LocationContainer> = null;
  lockers: Array<LocationLocker> = null;

  activeCountry: LocationCountry = null;
  activeSite: LocationSite = null;
  activeContainer: LocationContainer = null;

  constructor(private http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.fetchCountires();

  }


  fetchCountires() {
    let endpoint = `http://52.163.226.37/api/online/browse-locations`
    console.log("Fetching containers...", endpoint)
    this.http.get<LocationResponse>(endpoint).subscribe(data => {
      this.locations = data
      this._route.queryParams.subscribe(queries => {
        console.log(queries)
        if (queries.countryId != null) this.activeCountry = this.locations.countries.find(x => x.country.id == queries.countryId);
        if (queries.siteId != null && this.activeCountry != null) this.activeSite = this.activeCountry.sites.find(x => x.site.id == queries.siteId);
        if (queries.containerId != null && this.activeSite != null) this.activeContainer = this.activeSite.containers.find(x => x.container.id == queries.containerId);
      })
    })
  }


  changeParams() {
    let countryId = null;
    if(this.activeCountry) countryId = this.activeCountry.country.id;

    let siteId = null;
    if(this.activeSite) siteId = this.activeSite.site.id;

    let containerId = null;
    if(this.activeContainer) containerId = this.activeContainer.container.id;

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        countryId: countryId,
        siteId: siteId,
        containerId: containerId
      },
      queryParamsHandling: 'merge',
    });
  }
}
