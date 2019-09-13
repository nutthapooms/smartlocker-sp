import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpBackend,HttpParams} from '@angular/common/http';
import { SubcategoryDTO,CategoryDTO, LockerDTO } from 'src/app/shared/model';
import { DataService} from '../data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-subcategory-option',
  templateUrl: './subcategory-option.component.html',
  styleUrls: ['./subcategory-option.component.scss']
})
export class SubcategoryOptionComponent implements OnInit {
  subcategories: SubcategoryDTO[];
  categoryId: string;
  category: CategoryDTO;
  constructor(
    private http: HttpClient,
    private router: Router,
    private Category : DataService
  ) { 
    this.Category.currentMessage.subscribe(message => this.categoryId = message);
  }

  ngOnInit() {
    this.http.get<CategoryDTO>(`https://smartlocker.azurewebsites.net/api/admin/categories/${this.categoryId}`).subscribe(data => {
        console.log(data)
        this.category = data;
      }
    )
    let params = new HttpParams();
    if(this.categoryId) params = params.append('categoryId',this.categoryId);
    this.http.get<Array<SubcategoryDTO>>('https://smartlocker.azurewebsites.net/api/admin/subcategories', { params: params }).subscribe(data => {
        console.log(data)
        this.subcategories = data;
        document.getElementById("body").innerHTML = "";

      }
    )
  }
  routeToItem(Item:number) {
    //alert(Cat);
    this.Category.changeMessage(Item.toString());
    this.router.navigate(['/item-option'])
  }

}
