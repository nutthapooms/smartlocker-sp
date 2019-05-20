import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-browser',
  templateUrl: './item-browser.component.html',
  styleUrls: ['./item-browser.component.scss']
})
export class ItemBrowserComponent implements OnInit {
  models: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://52.163.226.37/api/models').subscribe(data =>
      this.models = data
    )
  }

}
