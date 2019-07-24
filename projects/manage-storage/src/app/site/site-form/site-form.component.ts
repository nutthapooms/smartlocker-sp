import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SiteDTO } from 'src/app/shared/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})
export class SiteFormComponent implements OnInit {
  countryId: string;
  siteId: string;
  site: SiteDTO = new SiteDTO();

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }


  ngOnInit() {
    this.siteId = this.route.snapshot.paramMap.get('siteId');
    this.countryId = this.route.snapshot.paramMap.get('countryId');
    if(this.siteId != null) {
      this.http.get<SiteDTO>(`https://smartlocker.azurewebsites.net/api/admin/sites/${this.siteId}`).subscribe(data => {
        console.log(data)
        this.site = data;
      })
    }

  }

  submitForm() {
    let endpoint: string;
    if(this.siteId != null) {
      endpoint = `https://smartlocker.azurewebsites.net/api/admin/sites/${this.siteId}`
     } else {
      endpoint = `https://smartlocker.azurewebsites.net/api/admin/sites`
     }

    this.http.post<any>(endpoint, {
      "name": this.site.name,
      "countryId": this.countryId
    }).subscribe(data => {
      console.log(this.route.parent)
      this.router.navigate(['/countries/',this.countryId,'sites'])
    })
  }
  back() {
    this.location.back();
  }

}
