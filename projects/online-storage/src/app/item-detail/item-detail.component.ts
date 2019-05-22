import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ItemResponse } from '../../../../../src/app/shared/model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item: ItemResponse = null;
  itemId: number;
  constructor(private http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.itemId = this._route.snapshot.params.itemId;


    this.http.get<ItemResponse>(`http://52.163.226.37/api/items/${this.itemId}`).subscribe(data => {
      this.item = data
      console.log(data)
    }

    )
  }

}
