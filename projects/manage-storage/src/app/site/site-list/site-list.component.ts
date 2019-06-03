import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SiteDTO, CountryDTO } from 'src/app/shared/model';
import { ActivatedRoute } from '@angular/router';
import { GetDtoService } from 'src/app/shared/get-dto.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {
  sites: SiteDTO[];
  countryId: string;
  country: CountryDTO;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private dto: GetDtoService) { }

  ngOnInit() {
    this.countryId = this.route.snapshot.paramMap.get('countryId');
    let params = new HttpParams();
    if (this.countryId) params = params.append('countryId', this.countryId);

    this.http.get<Array<SiteDTO>>(`http://52.163.226.37/api/admin/sites`, { params: params }).subscribe(data => {
      console.log(data)
      this.sites = data;
    })

    this.dto.getDTO('countries', this.countryId).subscribe(data => this.country = data)
  }

}