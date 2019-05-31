import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UnitDTO } from 'src/app/shared/model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {
  units: UnitDTO[];
  lockerId: string;

  constructor(private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.lockerId = this.route.snapshot.paramMap.get('lockerId');
    let params = new HttpParams();
    if(this.lockerId) params = params.append('lockerId', this.lockerId);

    this.http.get<Array<UnitDTO>>(`http://52.163.226.37/api/admin/units`, { params: params }).subscribe(data => {
        console.log(data)
        this.units = data;
      }
    )
  }

}
