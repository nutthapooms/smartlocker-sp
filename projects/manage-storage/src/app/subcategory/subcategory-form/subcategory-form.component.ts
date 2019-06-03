import { Component, OnInit } from '@angular/core';
import { SubcategoryDTO } from 'src/app/shared/model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subcategory-form',
  templateUrl: './subcategory-form.component.html',
  styleUrls: ['./subcategory-form.component.scss']
})
export class SubcategoryFormComponent implements OnInit {

  subcategoryId: string;
  categoryId: string;

  subcategory: SubcategoryDTO = new SubcategoryDTO();

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.subcategoryId = this.route.snapshot.paramMap.get('subcategoryId');

    if(this.subcategoryId != null) {
      this.http.get<SubcategoryDTO>(`http://52.163.226.37/api/admin/subcategories/${this.subcategoryId}`).subscribe(data => {
        console.log(data)
        this.subcategory = data;
      })
    }

  }

  submitForm() {
    let endpoint: string;
    if(this.subcategoryId != null) {
      endpoint = `http://52.163.226.37/api/admin/subcategories/${this.subcategoryId}`
     } else {
      endpoint = `http://52.163.226.37/api/admin/subcategories`
     }

    this.http.post<any>(endpoint, {
      "name": this.subcategory.name,
      "categoryId": this.categoryId
    }).subscribe(data => {
      console.log(this.route.parent)
      this.router.navigate(['/categories/',this.categoryId,'subcategories'])
    })
  }

}
