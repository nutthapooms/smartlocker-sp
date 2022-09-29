import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CountryResponse, SiteResponse, ContainerResponse, LockerResponse, LocationResponse, LocationCountry, LocationSite, LocationContainer, LocationLocker } from 'src/app/shared/model';
import { HttpClient, HttpBackend } from '@angular/common/http';

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
    private _router: Router,
    // private handler: HttpBackend
    ) {
      // this.http = new HttpClient(handler);
     }

  ngOnInit() {
    this.fetchCountires();

  }


  fetchCountires() {
    let endpoint = `https://smartlocker20220922110147.azurewebsites.net/api/online/browse-locations`
    console.log("Fetching containers...", endpoint)
    this.http.get<LocationResponse>(endpoint).subscribe(data => {
      this.locations = data
      this._route.queryParams.subscribe(queries => {
        this.countryId = queries.countryId ? parseInt(queries.countryId) : -1
        this.siteId = queries.siteId ? parseInt(queries.siteId) : -1
        this.containerId = queries.containerId ? parseInt(queries.containerId) : -1
  
        let country = this.locations.countries.find(x => x.country.id == this.countryId)
        if(country) {
          this.sites = country.sites;
        } else {
          this.siteId = -1
          this.sites = []
        }

        let site = this.sites.find(x => x.site.id == this.siteId)
        if(site) {
          this.containers = site.containers;
        } else {
          this.containerId = -1
          this.containers = []
        }
        this.changeParams()
        
      })
    })
  }
 

  changeParams() {
    let countryId = this.countryId != -1 ? this.countryId : undefined;
    let siteId = this.siteId != -1 ? this.siteId : undefined;
    let containerId = this.containerId != -1 ? this.containerId : undefined;

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
