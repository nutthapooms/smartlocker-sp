import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
import { DataService} from './data.service'
import { Injectable } from '@angular/core';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private data: DataService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.data.currentToken.subscribe(message => {
      // console.log('token :' + message)
      request = request.clone({
        
        setHeaders: {"Access-Control-Allow-Origin": window.location.origin },
        // setHeaders: { Authorization: 'Bearer ' + request.headers["X-MS-TOKEN-AAD-ACCESS-TOKEN"] },
        withCredentials : false
      });
    })

    return next.handle(request);
  }
}


export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    let pwd = "zFA5In7bV1Gr3b7Uq7ldZR276";
    if (req.url.includes("smartlocker")) {


      const clonedRequest = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'password': pwd
        })
      });

      return next.handle(clonedRequest);
      // clonedRequest.headers.append('Content-Type','application/json');
    }
    else {
      // return next.handle(req.clone({
      //   headers: new HttpHeaders({
      //     // 'Access-Control-Allow-Origin' : '*',
      //     // 'Content-Type': 'application/json',
      //     // 'password': pwd
      //   })
      // , withCredentials :false}));

    }

  }
}