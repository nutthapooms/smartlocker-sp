import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private http: HttpClient
    ) {}
     

  ngOnInit() {
    this.http.get('https://ticket/api/user/').subscribe(
      data => {
        console.log(data);
      }
      )
    }
  

}
