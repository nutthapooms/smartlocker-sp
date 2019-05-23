import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ItemResponse, CountryResponse, SiteResponse, ContainerResponse } from '../../../../../src/app/shared/model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item: ItemResponse = null;
  itemId: number;
  activeImage: string;

  activeSiteId: number = -1;
  activeContainerId: number = -1;
  activeCountryId: number = -1;

  activeCountry: CountryResponse = new CountryResponse();
  activeSite: SiteResponse = new SiteResponse();
  activeContainer: ContainerResponse = new ContainerResponse();

  constructor(private http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.itemId = this._route.snapshot.params.itemId;



    this.http.get<ItemResponse>(`http://52.163.226.37/api/items/${this.itemId}`).subscribe(data => {
      this.item = data
      console.log(data)
      if(this.item.images.length > 0) {
        this.activeImage = this.item.images[0]
      }

      this._route.queryParams.subscribe(queries => {
        if (queries.countryId) this.activeCountryId = queries.countryId;
        if (queries.siteId) this.activeSiteId = queries.siteId;
        if (queries.containerId) this.activeContainerId = queries.containerId;

        if (this.activeCountryId > -1) { this.activeCountry = this.item.availability.find(each => each.id == this.activeCountryId)}
        if (this.activeSiteId > -1) { this.activeSite = this.activeCountry.sites.find(each => each.id == this.activeSiteId)}

        // if (this.activeSiteId > -1) { this.containers = this.sites.find(each => each.id == this.siteId).containers } else { this.containers = null; this.containerId = -1 }
        // if (this.activeContainerId > -1) { this.lockers = this.containers.find(each => each.id == this.containerId).lockers } else { this.lockers = null; this.lockerId = -1 }

      });

    }

    )
  }

}
