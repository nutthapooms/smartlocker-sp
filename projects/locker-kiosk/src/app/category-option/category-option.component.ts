import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpBackend,HttpParams} from '@angular/common/http';
import { CategoryDTO, LockerDTO } from 'src/app/shared/model';
import { DataService} from '../data.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-category-option',
  templateUrl: './category-option.component.html',
  styleUrls: ['./category-option.component.scss']
})
export class CategoryOptionComponent implements OnInit {
  categories: CategoryDTO[];
  containerId: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private Category : DataService
  ) { }

  ngOnInit() {
    let params = new HttpParams();
    if(this.containerId) params = params.append('containerId', ' ');
    this.http.get<Array<CategoryDTO>>('https://smartlocker20220922110147.azurewebsites.net/api/admin/categories', { params: params }).subscribe(data => {
        console.log(data)
        this.categories = data;
        document.getElementById("body").innerHTML = "";
        if(this.categories.length > 7){
            document.getElementById("category-option").style.display = "static";
        }
      }
    )
  }
  routeToSubCat(Cat:number) {
    //alert(Cat);
    this.Category.changeMessage(Cat.toString());
    this.router.navigate(['/subcategory-option'])
  }

}
