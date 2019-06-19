import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UnitDTO, CountryDTO, SiteDTO, ContainerDTO } from 'src/app/shared/model';
import { ActivatedRoute } from '@angular/router';
import { GetDtoService } from 'src/app/shared/get-dto.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {
  units: UnitDTO[];
  lockerId: string;

  countryId: string;
  siteId: string;
  containerId: string;

  country: CountryDTO;
  site: SiteDTO;
  container: ContainerDTO;
  locker: ContainerDTO;


  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private dto: GetDtoService,
    private location: Location) { }

  ngOnInit() {
    this.countryId = this.route.snapshot.paramMap.get('countryId');
    this.siteId = this.route.snapshot.paramMap.get('siteId');
    this.containerId = this.route.snapshot.paramMap.get('containerId');
    this.lockerId = this.route.snapshot.paramMap.get('lockerId');


    let params = new HttpParams();
    if(this.lockerId) params = params.append('lockerId', this.lockerId);

    this.http.get<Array<UnitDTO>>(`http://http://192.168.1.34:8080/api/admin/units`, { params: params }).subscribe(data => {
        console.log(data)
        this.units = data;
      }
    )
    this.dto.getDTO('countries', this.countryId).subscribe(data => this.country = data)
    this.dto.getDTO('sites', this.siteId).subscribe(data => this.site = data)
    this.dto.getDTO('containers', this.containerId).subscribe(data => this.container = data)
    this.dto.getDTO('lockers', this.lockerId).subscribe(data => this.locker = data)

  }

  currentLocation() {
    return this.location.path()
  }

}
