import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LockerDTO } from 'src/app/shared/model';

@Component({
  selector: 'app-locker-list',
  templateUrl: './locker-list.component.html',
  styleUrls: ['./locker-list.component.scss']
})
export class LockerListComponent implements OnInit {
  lockers: LockerDTO[];
  containerId: string;

  constructor(private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.containerId = this.route.snapshot.paramMap.get('containerId');
    let params = new HttpParams();
    if(this.containerId) params = params.append('containerId', this.containerId);

    this.http.get<Array<LockerDTO>>(`http://52.163.226.37/api/lockers`, { params: params }).subscribe(data => {
        console.log(data)
        this.lockers = data;
      }
    )
  }

}
