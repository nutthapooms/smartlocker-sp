import { Component, OnInit } from '@angular/core';
import { ContainerDTO, SiteDTO, CountryDTO } from 'src/app/shared/model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { GetDtoService } from 'src/app/shared/get-dto.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {
  containers: ContainerDTO[];
  siteId: string;
  countryId: string;

  country: CountryDTO;
  site: SiteDTO;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private dto: GetDtoService,
    private location: Location) { }

  ngOnInit() {
    this.siteId = this.route.snapshot.paramMap.get('siteId');
    this.countryId = this.route.snapshot.paramMap.get('countryId');
    let params = new HttpParams();
    if(this.siteId) params = params.append('siteId', this.siteId);

    this.http.get<Array<ContainerDTO>>(`http://http://192.168.1.34:8080/api/admin/containers`, { params: params }).subscribe(data => {
        console.log(data)
        this.containers = data;
      })
      this.dto.getDTO('countries', this.countryId).subscribe(data => this.country = data)
      this.dto.getDTO('sites', this.siteId).subscribe(data => this.site = data)

  }
  currentLocation() {
    return this.location.path()
  }

}
