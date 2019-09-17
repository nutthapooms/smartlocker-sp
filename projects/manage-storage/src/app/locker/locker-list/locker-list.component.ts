import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LockerDTO, ContainerDTO, CountryDTO, SiteDTO, UnitDTO, BadgeInfo } from 'src/app/shared/model';
import { GetDtoService } from 'src/app/shared/get-dto.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-locker-list',
  templateUrl: './locker-list.component.html',
  styleUrls: ['./locker-list.component.scss']
})
export class LockerListComponent implements OnInit {
  lockers: LockerDTO[];

  containerId: string;
  countryId: string;
  siteId: string;

  country: CountryDTO;
  site: SiteDTO;
  container: ContainerDTO;


  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private dto: GetDtoService,
    private location: Location) { }

  ngOnInit() {
    this.countryId = this.route.snapshot.paramMap.get('countryId');
    this.siteId = this.route.snapshot.paramMap.get('siteId');
    this.containerId = this.route.snapshot.paramMap.get('containerId');
    let params = new HttpParams();
    if(this.containerId) params = params.append('containerId', this.containerId);

    this.http.get<Array<LockerDTO>>(`https://smartlocker.azurewebsites.net/api/admin/lockers`, { params: params }).subscribe(data => {
        console.log(data)
        data.forEach(locker => {
          this.http.get<BadgeInfo>('https://hoesql566.na.xom.com/BadgeEventAPI/api/Badge/ID/'+locker.badgeId, { withCredentials: true }).subscribe(user => {
              locker.employee = user.DisplayName;
          })
      });
        this.lockers = data;

      })
      this.dto.getDTO('countries', this.countryId).subscribe(data => this.country = data)
      this.dto.getDTO('sites', this.siteId).subscribe(data => this.site = data)
      this.dto.getDTO('containers', this.containerId).subscribe(data => this.container = data)

  }
  currentLocation() {
    return this.location.path()
  }

}
