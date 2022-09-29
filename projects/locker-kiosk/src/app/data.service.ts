import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

 
@Injectable()
export class DataService {
    
    private LockerName = new BehaviorSubject('80017');  
    currentLocker = this.LockerName.asObservable();

    private LockerSecret = new BehaviorSubject('dummy');  
    currentLockerSecret = this.LockerSecret.asObservable();

    private badgeIdSource = new BehaviorSubject('_');  
    currentBadgeId = this.badgeIdSource.asObservable();

    private messageSource = new BehaviorSubject('Default message');  
    currentMessage = this.messageSource.asObservable();

    private langSource = new BehaviorSubject('eng');  
    currentLanguage = this.langSource.asObservable();

    private token = new BehaviorSubject('no token');  
    currentToken = this.token.asObservable();

    constructor(
        private http: HttpClient
    ) { }
    changeMessage(message : string){
        this.messageSource.next(message);
    }
    changeSecret(message : string){
        this.LockerSecret.next(message);
    }
    changeToken(message : string){
        this.token.next(message);
    }

    changeLanguage(message : string){
        this.langSource.next(message);
    }
    changeBadgeId(message : string){
        this.badgeIdSource.next(message);
    }

    

    

}