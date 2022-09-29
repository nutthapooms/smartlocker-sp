import { Component, OnInit, Input } from '@angular/core';
import { ItemResponse, CountryResponse, SiteResponse, ContainerResponse, ItemDetailAvailabilityContainer, LocationResponse, LocationCountry, LocationSite, LocationContainer, WatchDTO, ItemDTO } from 'src/app/shared/model';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {
  @Input() availability: Array<ItemDetailAvailabilityContainer>;
  @Input() item: ItemDTO;
  filteredAvailability: Array<ItemDetailAvailabilityContainer>;
  activeCountry: LocationCountry = null;
  activeSite: LocationSite = null;
  isNotifiable: boolean = false;
  locations: LocationResponse;
  constructor(private http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router,
    // private handler: HttpBackend
    ) {
      // this.http = new HttpClient(handler);
     }

  ngOnInit() {
    this.fetchCountires()
  }
  fetchCountires() {
    let endpoint = `https://smartlocker20220922110147.azurewebsites.net/api/online/browse-locations`
    console.log("Fetching containers...", endpoint)
    this.http.get<LocationResponse>(endpoint).subscribe(data => {
      this.locations = data
      this._route.queryParams.subscribe(queries => {
        console.log(queries)
        if (queries.countryId != null) this.activeCountry = this.locations.countries.find(x => x.country.id == queries.countryId);
        if (queries.siteId != null && this.activeCountry != null) this.activeSite = this.activeCountry.sites.find(x => x.site.id == queries.siteId);
        this.changeParams()
      })
    })
  }

  changeParams() {
    let countryId = null;
    if(this.activeCountry) countryId = this.activeCountry.country.id;

    let siteId = null;
    if(this.activeSite) siteId = this.activeSite.site.id;
    console.log(this.activeSite)


    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        countryId: countryId,
        siteId: siteId,
        containerId: null
      },
      queryParamsHandling: 'merge',
    });
    this.filteredAvailability = JSON.parse(JSON.stringify(this.availability));
    if(this.activeCountry) this.filteredAvailability = this.filteredAvailability.filter(x => x.country.id == this.activeCountry.country.id);
    if(this.activeSite) this.filteredAvailability = this.filteredAvailability.filter(x => x.site.id == this.activeSite.site.id);

    console.log(this.filteredAvailability)
  }

  notifyMe(container: ItemDetailAvailabilityContainer) {
    this.http.post<WatchDTO>(`https://smartlocker20220922110147.azurewebsites.net/api/online/items/${this.item.id}/watch`, {
      "containerId": container.container.id
    }).subscribe(data => {
      container.watch = data;
    })
  }
  unnotifyMe(container: ItemDetailAvailabilityContainer) {
    this.http.delete<number>(`https://smartlocker20220922110147.azurewebsites.net/api/online/items/${this.item.id}/watch/${container.watch.id}`).subscribe(data => {
      container.watch = null;
    })
  }


}
