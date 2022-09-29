import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


 
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

    constructor() { }
    changeMessage(message : string){
        this.messageSource.next(message);
    }
    changeSecret(message : string){
        this.LockerSecret.next(message);
    }
    changeLanguage(message : string){
        this.langSource.next(message);
    }
    changeBadgeId(message : string){
        this.badgeIdSource.next(message);
    }


    

}