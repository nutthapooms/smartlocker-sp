import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
    private _router: Router) { }

  ngOnInit() {
    this.itemId = this._route.snapshot.params.itemId;



    this.http.get<ItemDetailResponse>(`/api/online/items/${this.itemId}`).subscribe(data => {
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
