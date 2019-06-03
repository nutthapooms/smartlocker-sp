import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnitDTO } from 'src/app/shared/model';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.unitId = this.route.snapshot.paramMap.get('unitId');
    this.subcategoryId = this.route.snapshot.paramMap.get('subcategoryId');
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    if(this.unitId != null) {
      this.http.get<UnitDTO>(`http://52.163.226.37/api/admin/units/${this.unitId}`).subscribe(data => {
        console.log(data)
        this.unit = data;
      })
    }

  }

  submitForm() {
    let endpoint: string;
    if(this.unitId != null) {
      endpoint = `http://52.163.226.37/api/admin/units/${this.unitId}`
     } else {
      endpoint = `http://52.163.226.37/api/admin/units`
     }

    this.http.post<any>(endpoint, {
      "name": this.unit.name,
      "itemId": this.itemId
    }).subscribe(data => {
      this.router.navigate(['/categories',this.categoryId,'subcategories', this.subcategoryId,'items', this.itemId,'units'])
    })
  }
}
