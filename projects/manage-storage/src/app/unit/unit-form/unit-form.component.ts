import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryDTO, SubcategoryDTO, ItemDTO, UnitDTO } from 'src/app/shared/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss']
})
export class UnitFormComponent implements OnInit {
  categoryId: string = null;
  categories: Array<CategoryDTO> = new Array<CategoryDTO>();

  subcategoryId: string = null;
  subcategories: Array<SubcategoryDTO> = new Array<SubcategoryDTO>();

  itemId: string = null;
  items: Array<ItemDTO> = new Array<ItemDTO>();

  unitId: string = null;
  units: Array<UnitDTO> = new Array<UnitDTO>();

  lockerId: string;
  countryId: string;
  siteId: string;
  containerId: string;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }



  ngOnInit() {
    this.countryId = this.route.snapshot.paramMap.get('countryId');
    this.siteId = this.route.snapshot.paramMap.get('siteId');
    this.containerId = this.route.snapshot.paramMap.get('containerId');
    this.lockerId = this.route.snapshot.paramMap.get('lockerId');

    this.http.get<Array<CategoryDTO>>(`https://smartlocker20220922110147.azurewebsites.net/api/admin/categories`).subscribe(data => {
      console.log(data)
      this.categories = data;
    })
  }

  fetchSubcategory(categoryId: string) {
    this.http.get<Array<SubcategoryDTO>>(`https://smartlocker20220922110147.azurewebsites.net/api/admin/subcategories`, {params : {
      "categoryId": categoryId
    }}).subscribe(data => {
      console.log(data)
      this.subcategories = data;
    })
  }

  fetchItem(subcategoryId: string) {
    this.http.get<Array<ItemDTO>>(`https://smartlocker20220922110147.azurewebsites.net/api/admin/items`, {params : {
      "subcategoryId": subcategoryId
    }}).subscribe(data => {
      console.log(data)
      this.items = data;
    })
  }

  fetchUnit(itemId: string) {
    this.http.get<Array<UnitDTO>>(`https://smartlocker20220922110147.azurewebsites.net/api/admin/units`, {params : {
      "itemId": itemId
    }}).subscribe(data => {
      console.log(data)
      this.units = data;
    })
  }


  submitForm() {
    let endpoint: string;
    endpoint = `https://smartlocker20220922110147.azurewebsites.net/api/admin/units/${this.unitId}`

    this.http.post<any>(endpoint, {
      "lockerId": this.lockerId,
    }).subscribe(data => {
      console.log(this.route.parent)
      this.router.navigate(['/countries/',this.countryId,'sites',this.siteId,'containers',this.containerId,'lockers',this.lockerId,'units'])
    })
  }

  back() {
    this.location.back();
  }

}
