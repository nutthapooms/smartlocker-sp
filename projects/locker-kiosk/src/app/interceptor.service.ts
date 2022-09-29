import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { DataService } from './data.service';
import { map } from 'rxjs/operators'
export class AddHeaderInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();
  private token = "";
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header

    if (req.url.includes("token")) {
      return next.handle(req).pipe(map(event => {
        if(event instanceof HttpResponse){
          // console.log(event.clone().body.secret);
          this.token = event.clone().body.secret;
        }
        return event;
      }))
    }
    const clonedRequest = req.clone({ headers: req.headers.append('Authorization', 'Bearer '+ this.token) });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(req);
    // return next.handle(clonedRequest);
  }
}