import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LockerDTO } from 'src/app/shared/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-locker-form',
  templateUrl: './locker-form.component.html',
  styleUrls: ['./locker-form.component.scss']
})
export class LockerFormComponent implements OnInit {

  countryId: string;
  siteId: string;
  containerId: string;
  lockerId: string;

  locker: LockerDTO = new LockerDTO();

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.countryId = this.route.snapshot.paramMap.get('countryId');
    this.siteId = this.route.snapshot.paramMap.get('siteId');
    this.containerId = this.route.snapshot.paramMap.get('containerId');
    this.lockerId = this.route.snapshot.paramMap.get('lockerId');

    if(this.lockerId != null) {
      this.http.get<LockerDTO>(`/api/admin/lockers/${this.lockerId}`).subscribe(data => {
        console.log(data)
        this.locker = data;
      })
    }

  }

  submitForm() {
    let endpoint: string;
    if(this.lockerId != null) {
      endpoint = `/api/admin/lockers/${this.lockerId}`
     } else {
      endpoint = `/api/admin/lockers`
     }

    this.http.post<any>(endpoint, {
      "name": this.locker.name,
      "containerId": this.containerId
    }).subscribe(data => {
      console.log(this.route.parent)
      this.router.navigate(['/countries/',this.countryId,'sites', this.siteId,'containers', this.containerId,'lockers'])
    })
  }

  back() {
    this.location.back();
  }

}
