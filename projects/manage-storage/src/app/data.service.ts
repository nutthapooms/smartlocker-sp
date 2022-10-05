import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

 
@Injectable()
export class DataService {

    private token = new BehaviorSubject('no token');  
    currentToken = this.token.asObservable();

    constructor(
    ) { }

    changeToken(message : string){
        this.token.next(message);
    }


    

    

}