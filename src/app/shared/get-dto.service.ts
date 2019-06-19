import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDtoService {

  constructor(private http: HttpClient) { }

  getDTO(dtoEndpoint: string, dtoId: string): Observable<any> {
    let endpoint = `http://192.168.1.34:8080/api/admin/${dtoEndpoint}/${dtoId}`
    return this.http.get(endpoint)
  }

}
