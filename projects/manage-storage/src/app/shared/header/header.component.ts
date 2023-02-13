import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'projects/manage-storage/src/app/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private data: DataService
  ) {
    setInterval(() => {
      this.data.changeToken(this.getToken())
    }, 60000 * 15);
  }
  getToken2(): string {
    try {

      console.log('getting token')
      this.http.post<any>("https://login.microsoftonline.com/d1ee1acd-bc7a-4bc4-a787-938c49a83906/oauth2/v2.0/token",
        'grant_type=client_credentials&client_id=a61a1ea8-c8a9-47bf-a84f-caba25dd5879&scope=api://3a4bd202-bede-4dd7-8321-cda964ab6fee/.default&client_secret=ahL8Q~AZv0FC2ZmYKAea~ov.ScVjrOl~PgWdicmc',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          
        }).subscribe(data => {
          // console.log(data.access_token)

          this.data.changeToken(data.access_token)
          return data.access_token

        })
    }
    catch (error) {
      return error
    }
  }

  getToken(): string {
    try {

      console.log('getting token')
      this.http.post<any>("https://login.microsoftonline.com/d1ee1acd-bc7a-4bc4-a787-938c49a83906/oauth2/v2.0/token",
        'grant_type=client_credentials&client_id=a61a1ea8-c8a9-47bf-a84f-caba25dd5879&scope=api://3a4bd202-bede-4dd7-8321-cda964ab6fee/.default&client_secret=ahL8Q~AZv0FC2ZmYKAea~ov.ScVjrOl~PgWdicmc',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',

          },
          withCredentials: false

        }).subscribe(data => {
          // console.log(data.access_token)
          this.data.changeToken(data.access_token)
          return data.access_token

        })
    }
    catch (error) {
      return error
    }
  }

  ngOnInit() {
    this.getToken()

  }

}
