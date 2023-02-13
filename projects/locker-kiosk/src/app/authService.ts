import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService{

 constructor(
     private http : HttpClient
 ) { }

 async getAuthToken() {
    try {
        await this.http.post<any>("https://login.microsoftonline.com/d1ee1acd-bc7a-4bc4-a787-938c49a83906/oauth2/v2.0/token",
            'grant_type=client_credentials&client_id=a61a1ea8-c8a9-47bf-a84f-caba25dd5879&scope=api://3a4bd202-bede-4dd7-8321-cda964ab6fee/.default&client_secret=ahL8Q~AZv0FC2ZmYKAea~ov.ScVjrOl~PgWdicmc',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials : false

            }).subscribe(data => {
                // console.log(data.access_token)
                return data.access_token
            })
    } catch (error) {
        console.log(error)
        return 'error'

    }
 
 }
}
