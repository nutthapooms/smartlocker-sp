import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnitDTO, ItemDTO } from 'src/app/shared/model';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDtoService } from 'src/app/shared/get-dto.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-unit-form',
  templateUrl: './item-unit-form.component.html',
  styleUrls: ['./item-unit-form.component.scss']
})
export class ItemUnitFormComponent implements OnInit {

  unitId: string;
  itemId: string;
  unit: UnitDTO = new UnitDTO();
  subcategoryId: string;
  categoryId: string;
  item: ItemDTO;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private dto: GetDtoService,
    private location: Location) { }

  ngOnInit() {
    this.unitId = this.route.snapshot.paramMap.get('unitId');
    this.subcategoryId = this.route.snapshot.paramMap.get('subcategoryId');
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    if(this.unitId != null) {
      this.http.get<UnitDTO>(`https://smartlocker.azurewebsites.net/api/admin/units/${this.unitId}`).subscribe(data => {
        console.log(data)
        this.unit = data;
      })
    }
    this.dto.getDTO('items', this.itemId).subscribe(data => this.item = data)

  }



  submitForm() {
    let endpoint: string;
    if(this.unitId != null) {
      endpoint = `https://smartlocker.azurewebsites.net/api/admin/units/${this.unitId}`
     } else {
      endpoint = `https://smartlocker.azurewebsites.net/api/admin/units`
     }

    this.http.post<any>(endpoint, {
      "barcode": this.unit.barcode,
      "serialNumber": this.unit.serialNumber,
      "itemId": this.itemId
    }).subscribe(data => {
      this.router.navigate(['/categories',this.categoryId,'subcategories', this.subcategoryId,'items', this.itemId,'units'])
    })


  }

  back() {
    this.location.back();
  }
}
