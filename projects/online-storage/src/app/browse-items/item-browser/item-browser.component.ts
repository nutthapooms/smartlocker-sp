import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryResponse, SiteResponse, ContainerResponse, BrowseResponse } from '../../../../../../src/app/shared/model';

@Component({
  selector: 'app-item-browser',
  templateUrl: './item-browser.component.html',
  styleUrls: ['./item-browser.component.scss']
})
export class ItemBrowserComponent implements OnInit {
  catalog: BrowseResponse;
  containers: any = null;

  activeCategoryId: number = -1;
  activeSubcategoryId: number = -1;

  activeSiteId: number = -1;
  activeContainerId: number = -1;
  activeCountryId: number = -1;

  activeCountry: CountryResponse = new CountryResponse();
  activeSite: SiteResponse = new SiteResponse();
  activeContainer: ContainerResponse = new ContainerResponse();
  keyword: string = '';

  queryParams: BrowseItemParams = new BrowseItemParams();

  constructor(private http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.queryParams.subscribe(queries => {
      this.queryParams.categoryId = queries.categoryId ? queries.categoryId : undefined
      this.queryParams.subcategoryId = queries.subcategoryId ? queries.subcategoryId : undefined
      this.queryParams.countryId = queries.countryId ? queries.countryId : undefined
      this.queryParams.siteId = queries.siteId ? queries.siteId : undefined
      this.queryParams.containerId = queries.containerId ? queries.containerId : undefined
      this.queryParams.keyword = queries.keyword ? queries.keyword : undefined
      let endpoint = `http://207.46.236.46/api/online/items`
      console.log("Fetching models...", endpoint, {params : this.queryParams})
      this.http.get<BrowseResponse>(endpoint, {params : JSON.parse(JSON.stringify(this.queryParams))}).subscribe(data =>
        this.catalog = data
      )
    });
  }





  getFirstModelImage(model) {
    if(model.images.length > 0){
      return 'http://207.46.236.46/api/images/' + model.images[0];
    } else {
      return 'http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg'
    }
  }

  changeParams() {

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        keyword: this.queryParams.keyword,
      },
      queryParamsHandling: 'merge',
    });
  }

}

export class BrowseItemParams {
  subcategoryId: string = undefined;
  categoryId: string = undefined;
  countryId: string = undefined;
  siteId: string = undefined;
  containerId: string = undefined;
  keyword: string = undefined;
}
