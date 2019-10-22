import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';

export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    if (req.url.includes("smartlocker")) {


      if (req.method.toLowerCase() === 'post' || req.method.toLowerCase() === 'delete') {
        const clonedRequest = req.clone({ headers: req.headers.set('Content-Type', 'application/json'),body : JSON.stringify(req.body).replace("{","{'password':'123333',")});
        console.log(clonedRequest.body);
        console.log(clonedRequest.method);

        return next.handle(clonedRequest);

      }
      else {
        const clonedRequest = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        return next.handle(clonedRequest);

      }
      // clonedRequest.headers.append('Content-Type','application/json');
    }
    else {
      return next.handle(req.clone({ withCredentials: true }));

    }

    // Pass the cloned request instead of the original request to the next handle
  }
}