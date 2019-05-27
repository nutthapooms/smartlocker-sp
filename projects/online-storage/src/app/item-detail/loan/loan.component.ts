import { Component, OnInit, Input } from '@angular/core';
import { ItemDetailLoan } from 'src/app/shared/model';
import * as moment from 'moment';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  @Input() loan: ItemDetailLoan;
  today = moment.now();

  constructor() { }

  ngOnInit() {
  }

}
