import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    let pwd = "zFA5In7bV1Gr3b7Uq7ldZR276";

    const clonedRequest = req.clone({ headers: req.headers.append('password', pwd) });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}