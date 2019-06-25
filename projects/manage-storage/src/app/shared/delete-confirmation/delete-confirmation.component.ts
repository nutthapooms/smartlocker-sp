import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {
  endpoint: string;
  next: string;
  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private location: Location) {

    this.route.queryParams.subscribe(params => {
      this.endpoint = params['endpoint'];
      this.next = params['next'];
    });
  }

  ngOnInit() {
  }

  delete() {
    this.http.delete('/api/admin/' + this.endpoint).subscribe(data => {
      this.router.navigate([this.next])
    })
  }
  back() {
    this.location.back();
  }

}
