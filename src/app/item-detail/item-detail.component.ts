import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ItemResponse } from '../shared/model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item: ItemResponse = null;
  constructor(private http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.http.get<ItemResponse>('http://52.163.226.37/api/items/1').subscribe(data => {
      this.item = data
      console.log(data)
    }

    )
  }

}
