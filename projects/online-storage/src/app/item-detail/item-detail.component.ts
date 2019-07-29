import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { ItemResponse, CountryResponse, SiteResponse, ContainerResponse, ItemDetailResponse, CountryDTO, ItemDetailAvailabilityContainer } from '../../../../../src/app/shared/model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item: ItemDetailResponse = null;
  itemId: number;
  activeImage: number;

  activeSiteId: number = -1;
  activeContainerId: number = -1;
  activeCountryId: number = -1;

  activeCountry: ItemDetailAvailabilityContainer = new ItemDetailAvailabilityContainer();
  activeSite: SiteResponse = new SiteResponse();
  activeContainer: ContainerResponse = new ContainerResponse();

  constructor(private http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router,
    private handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
     }

  ngOnInit() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', '3721_226000');
    this.itemId = this._route.snapshot.params.itemId;
    this.http.get<ItemDetailResponse>(`https://smartlocker.azurewebsites.net/api/online/items/${this.itemId}`,{headers:headers}).subscribe(data => {
      this.item = data
      console.log(data)
      if(this.item.item.images.length > 0) {
        this.activeImage = this.item.item.images[0]
      }

      this._route.queryParams.subscribe(queries => {
        if (queries.countryId) this.activeCountryId = queries.countryId;
        if (queries.siteId) this.activeSiteId = queries.siteId;

        if (this.activeCountryId > -1) { this.activeCountry = this.item.availability.find(each => each.country.id == this.activeCountryId)}
        // if (this.activeSiteId > -1) { this.activeSite = this.activeCountry.sites.find(each => each..id == this.activeSiteId)}

      });

    }

    )
  }
  setActiveImage(imageId: number){
    this.activeImage = imageId;
  }

}
