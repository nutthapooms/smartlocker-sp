import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { TypeResponse, TypeCategory, TypeSubcategory } from 'src/app/shared/model';

@Component({
  selector: 'app-category-browser',
  templateUrl: './category-browser.component.html',
  styleUrls: ['./category-browser.component.scss']
})
export class CategoryBrowserComponent implements OnInit {
  types: TypeResponse;
  activeCategoryId: number = null;
  activeSubcategoryId: number = null;

  constructor(private http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.http.get<TypeResponse>('http://localhost:8080/api/online/browse-types').subscribe(data => {
      this.types = data

      this._route.queryParams.subscribe(queries => {
        if(queries.categoryId) this.activeCategoryId = queries.categoryId;
        if(queries.subcategoryId) this.activeSubcategoryId = queries.subcategoryId;
      });
    })



  }

  addCategoryParams(id) {
    this.activeCategoryId = id;
    this.activeSubcategoryId = null
    this.changeParams();
  }
  addSubcategoryParams(id) {
    this.activeCategoryId = null;
    this.activeSubcategoryId = id
    this.changeParams();
  }
  changeParams() {
    let queryParams: any = {
      subcategoryId: this.activeSubcategoryId,
      categoryId: this.activeCategoryId
    }
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

}
