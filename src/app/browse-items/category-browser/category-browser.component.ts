import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-browser',
  templateUrl: './category-browser.component.html',
  styleUrls: ['./category-browser.component.scss']
})
export class CategoryBrowserComponent implements OnInit {
  categories: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://52.163.226.37/api/categories').subscribe(data =>
      this.categories = data
    )
  }

}
