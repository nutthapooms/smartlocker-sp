import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CategoryDTO, SubcategoryDTO, ItemDTO, UnitDTO } from 'src/app/shared/model';
import { ActivatedRoute } from '@angular/router';
import { GetDtoService } from 'src/app/shared/get-dto.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-unit-list',
  templateUrl: './item-unit-list.component.html',
  styleUrls: ['./item-unit-list.component.scss']
})
export class ItemUnitListComponent implements OnInit {
  units: UnitDTO[];

  categoryId: string;
  subcategoryId: string;
  itemId: string;

  category: CategoryDTO;
  subcategory: SubcategoryDTO;
  item: ItemDTO;



  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private dto: GetDtoService,
    private location: Location) { }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.subcategoryId = this.route.snapshot.paramMap.get('subcategoryId');
    this.itemId = this.route.snapshot.paramMap.get('itemId');

    let params = new HttpParams();
    if(this.itemId) params = params.append('itemId', this.itemId);

    this.http.get<Array<UnitDTO>>(`http://localhost:8080/api/admin/units`, { params: params }).subscribe(data => {
        console.log(data)
        this.units = data;
      }
    )
    this.dto.getDTO('categories', this.categoryId).subscribe(data => this.category = data)
    this.dto.getDTO('subcategories', this.subcategoryId).subscribe(data => this.subcategory = data)
    this.dto.getDTO('items', this.itemId).subscribe(data => this.item = data)

  }

  currentLocation() {
    return this.location.path()
  }

}
