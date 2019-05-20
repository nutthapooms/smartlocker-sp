import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-browser',
  templateUrl: './item-browser.component.html',
  styleUrls: ['./item-browser.component.scss']
})
export class ItemBrowserComponent implements OnInit {
  models: any = [];
  activeCategoryId: number = -1;
  activeSubcategoryId: number = -1;
  keyword: string = '';

  constructor(private http: HttpClient,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchModels();
  }

  fetchModels() {

    this._route.queryParams.subscribe(queries => {
      if (queries.categoryId) this.activeCategoryId = queries.categoryId;
      if (queries.subcategoryId) this.activeSubcategoryId = queries.subcategoryId;
      let endpoint = `http://52.163.226.37/api/models?subcategoryId=${this.activeSubcategoryId}&categoryId=${this.activeCategoryId}&keyword=${this.keyword}`
      console.log("Fetching models...", endpoint)
      this.http.get(endpoint).subscribe(data =>
        this.models = data
      )
    });
  }

}
