import { Component, OnInit } from '@angular/core';
import { ContainerDTO, SiteDTO } from 'src/app/shared/model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {
  containers: ContainerDTO[];
  siteId: string;


  constructor(private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.siteId = this.route.snapshot.paramMap.get('siteId');
    let params = new HttpParams();
    if(this.siteId) params = params.append('siteId', this.siteId);

    this.http.get<Array<ContainerDTO>>(`http://52.163.226.37/api/containers`, { params: params }).subscribe(data => {
        console.log(data)
        this.containers = data;
      }
    )
  }

}
