import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';

export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    let pwd = "zFA5In7bV1Gr3b7Uq7ldZR276";
    if (req.url.includes("smartlocker")) {


      if (req.method.toLowerCase() === 'post' || req.method.toLowerCase() === 'delete') {
        const clonedRequest = req.clone({ headers: req.headers.set('Content-Type', 'application/json'),body : JSON.stringify(req.body).replace("{","{'password':'" + pwd+ "',")});
        console.log(clonedRequest.body);
        console.log(clonedRequest.method);

        return next.handle(clonedRequest);

      }
      else {
        const clonedRequest = req.clone({ headers: new HttpHeaders ({'Content-Type':  'application/json',
        'password': pwd})});
        
        return next.handle(clonedRequest);

      }
      // clonedRequest.headers.append('Content-Type','application/json');
    }
    else {
      return next.handle(req.clone({ withCredentials: true }));

    }

  }
}