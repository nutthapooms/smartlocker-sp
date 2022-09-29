import { Component, OnInit } from '@angular/core';
import { ItemDTO, CategoryDTO, SubcategoryDTO } from 'src/app/shared/model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { GetDtoService } from 'src/app/shared/get-dto.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  items: ItemDTO[];
  categoryId: string;
  subcategoryId: string;

  category: CategoryDTO;
  subcategory: SubcategoryDTO;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private dto: GetDtoService,
    private location: Location) { }


  ngOnInit() {
    this.subcategoryId = this.route.snapshot.paramMap.get('subcategoryId');
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    let params = new HttpParams();
    if(this.subcategoryId) params = params.append('subcategoryId', this.subcategoryId);

    this.http.get<Array<ItemDTO>>(`https://smartlocker20220922110147.azurewebsites.net/api/admin/items`, { params: params }).subscribe(data => {
        console.log(data)
        this.items = data;
      })
      this.dto.getDTO('categories', this.categoryId).subscribe(data => this.category = data)
      this.dto.getDTO('subcategories', this.subcategoryId).subscribe(data => this.subcategory = data)

  }
  currentLocation() {
    return this.location.path()
  }

}
