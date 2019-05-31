import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  table = new TableModel();

  constructor() { }

  ngOnInit() {
    this.table.columnName = [
      "Name",
      "Containers",
    ]
    this.table.rows = [
      {
        text: "New",
        routerLink: null
      }
    ]
  }

}

export class TableModel {
  public columnName: Array<string>;
  public rows: Array<TableCell>;
}

export class TableCell {
  public text: string;
  public routerLink: string;
}


