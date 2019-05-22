import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryResponse, SiteResponse, ContainerResponse } from '../../../../../../src/app/shared/model';

@Component({
  selector: 'app-item-browser',
  templateUrl: './item-browser.component.html',
  styleUrls: ['./item-browser.component.scss']
})
export class ItemBrowserComponent implements OnInit {
  models: any = [];
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

  constructor(private http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.fetchModels();
  }



  addCategoryParams(id) {
  }

  fetchModels() {
    this._route.queryParams.subscribe(queries => {
      if (queries.categoryId) this.activeCategoryId = queries.categoryId;
      if (queries.subcategoryId) this.activeSubcategoryId = queries.subcategoryId;
      if (queries.countryId) this.activeCountryId = queries.countryId;
      if (queries.siteId) this.activeSiteId = queries.siteId;
      if (queries.containerId) this.activeContainerId = queries.containerId;
      let endpoint = `http://52.163.226.37/api/items?subcategoryId=${this.activeSubcategoryId}&categoryId=${this.activeCategoryId}&siteId=${this.activeSiteId}&containerId=${this.activeContainerId}&keyword=${this.keyword}&countryId=${this.activeCountryId}`
      console.log("Fetching models...", endpoint)
      this.http.get(endpoint).subscribe(data =>
        this.models = data
      )
    });
  }

  getFirstModelImage(model) {
    if(model.images.length > 0){
      return 'http://52.163.226.37/api/images/' + model.images[0];
    } else {
      return 'http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg'
    }
  }

}
