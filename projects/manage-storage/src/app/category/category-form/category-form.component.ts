import { Component, OnInit } from '@angular/core';
import { CategoryDTO } from 'src/app/shared/model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  categoryId: string;
  category: CategoryDTO = new CategoryDTO();

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }


  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    if(this.categoryId != null) {
      this.http.get<CategoryDTO>(`http://localhost:8080/api/admin/categories/${this.categoryId}`).subscribe(data => {
        console.log(data)
        this.category = data;
      })
    }

  }

  submitForm() {
    let endpoint: string;
    if(this.categoryId != null) {
      endpoint = `http://localhost:8080/api/admin/categories/${this.categoryId}`
     } else {
      endpoint = `http://localhost:8080/api/admin/categories`
     }

    this.http.post<any>(endpoint, {
      "name": this.category.name
    }).subscribe(data => {
      this.router.navigate(['/categories'])
    })
  }

  back() {
    this.location.back();
  }
}
