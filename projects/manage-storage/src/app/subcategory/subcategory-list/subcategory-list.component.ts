import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SubcategoryDTO, CategoryDTO } from 'src/app/shared/model';
import { ActivatedRoute } from '@angular/router';
import { GetDtoService } from 'src/app/shared/get-dto.service';

@Component({
  selector: 'app-subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.scss']
})
export class SubcategoryListComponent implements OnInit {

  subcategories: SubcategoryDTO[];
  categoryId: string;

  category: CategoryDTO;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private dto: GetDtoService) { }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    let params = new HttpParams();
    if(this.categoryId) params = params.append('categoryId', this.categoryId);

    this.http.get<Array<SubcategoryDTO>>(`http://52.163.226.37/api/admin/subcategories`, { params: params }).subscribe(data => {
        console.log(data)
        this.subcategories = data;
      })
      this.dto.getDTO('categories', this.categoryId).subscribe(data => this.category = data)

  }

}
