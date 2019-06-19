import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContainerDTO } from 'src/app/shared/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-container-form',
  templateUrl: './container-form.component.html',
  styleUrls: ['./container-form.component.scss']
})
export class ContainerFormComponent implements OnInit {

  countryId: string;
  siteId: string;
  containerId: string;
  container: ContainerDTO = new ContainerDTO();

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }


  ngOnInit() {
    this.siteId = this.route.snapshot.paramMap.get('siteId');
    this.containerId = this.route.snapshot.paramMap.get('containerId');
    this.countryId = this.route.snapshot.paramMap.get('countryId');
    if(this.containerId != null) {
      this.http.get<ContainerDTO>(`/api/admin/containers/${this.containerId}`).subscribe(data => {
        console.log(data)
        this.container = data;
      })
    }

  }

  submitForm() {
    let endpoint: string;
    if(this.containerId != null) {
      endpoint = `/api/admin/containers/${this.containerId}`
     } else {
      endpoint = `/api/admin/containers`
     }

    this.http.post<any>(endpoint, {
      "name": this.container.name,
      "siteId": this.siteId
    }).subscribe(data => {
      console.log(this.route.parent)
      this.router.navigate(['/countries/',this.countryId,'sites', this.siteId,'containers'])
    })
  }
  back() {
    this.location.back();
  }
}
