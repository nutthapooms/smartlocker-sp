import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-browser',
  templateUrl: './category-browser.component.html',
  styleUrls: ['./category-browser.component.scss']
})
export class CategoryBrowserComponent implements OnInit {
  categories: any = [];
  activeCategoryId: number = -1;
  activeSubcategoryId: number = -1;
  constructor(private http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.http.get('http://52.163.226.37/api/categories').subscribe(data =>
      this.categories = data
    )

    this._route.queryParams.subscribe(queries => {
      if(queries.categoryId) this.activeCategoryId = queries.categoryId;
      if(queries.subcategoryId) this.activeSubcategoryId = queries.subcategoryId;
    });

  }

  addCategoryParams(id) {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        categoryId: id,
        subcategoryId: -1
      },
      queryParamsHandling: 'merge',
    });
  }
  addSubcategoryParams(id) {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        subcategoryId: id,
        categoryId: -1
      },
      queryParamsHandling: 'merge',
    });
  }

}
