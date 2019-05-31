import { Component, OnInit } from '@angular/core';
import { ItemDTO } from 'src/app/shared/model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  items: ItemDTO[];
  subcategoryId: string;

  constructor(private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subcategoryId = this.route.snapshot.paramMap.get('subcategoryId');
    let params = new HttpParams();
    if(this.subcategoryId) params = params.append('subcategoryId', this.subcategoryId);

    this.http.get<Array<ItemDTO>>(`http://52.163.226.37/api/admin/items`, { params: params }).subscribe(data => {
        console.log(data)
        this.items = data;
      }
    )
  }

}
