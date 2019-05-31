import { Component, OnInit } from '@angular/core';
import { CategoryDTO, LockerDTO } from 'src/app/shared/model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: CategoryDTO[];
  containerId: string;

  constructor(private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.containerId = this.route.snapshot.paramMap.get('containerId');
    let params = new HttpParams();
    if(this.containerId) params = params.append('containerId', this.containerId);

    this.http.get<Array<CategoryDTO>>(`http://52.163.226.37/api/admin/categories`, { params: params }).subscribe(data => {
        console.log(data)
        this.categories = data;
      }
    )
  }


}
