import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpBackend,HttpParams} from '@angular/common/http';
import { SubcategoryDTO,CategoryDTO, ItemDTO } from 'src/app/shared/model';
import { DataService} from '../data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-option',
  templateUrl: './item-option.component.html',
  styleUrls: ['./item-option.component.scss']
})
export class ItemOptionComponent implements OnInit {
  items: ItemDTO[];
  SubcategoryId: string;
  Subcategory: SubcategoryDTO;
  constructor(
    private http: HttpClient,
    private router: Router,
    private Category : DataService
  ) { 
    this.Category.currentMessage.subscribe(message => this.SubcategoryId = message);
  }

  ngOnInit() {
    this.http.get<SubcategoryDTO>(`https://smartlocker20220922110147.azurewebsites.net/api/admin/subcategories/${this.SubcategoryId}`).subscribe(data => {
        console.log(data)
        this.Subcategory = data;
      }
    )
    let params = new HttpParams();
    if(this.SubcategoryId) params = params.append('subcategoryId',this.SubcategoryId);
    this.http.get<Array<ItemDTO>>('https://smartlocker20220922110147.azurewebsites.net/api/admin/items', { params: params }).subscribe(data => {
        console.log(data)
        this.items = data;
        document.getElementById("body").innerHTML = "";

      }
    )
  }
  routeToUnit(ItemId:number) {
    //alert(Cat);
    this.Category.changeMessage(ItemId.toString());
    this.router.navigate(['/unit-option'])
  }

}
