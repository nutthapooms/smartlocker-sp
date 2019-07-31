import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
 
@Injectable()
export class DataService {
    private messageSource = new BehaviorSubject('Default message');  
    currentMessage = this.messageSource.asObservable();

    private nameSource = new BehaviorSubject('Default name');  
    currentName = this.nameSource.asObservable();

    private lastnameSource = new BehaviorSubject('Default lastname');  
    currentLastName = this.lastnameSource.asObservable();


    constructor() { }
    changeMessage(message : string){
        this.messageSource.next(message);
    }
    changeName(message : string){
        this.nameSource.next(message);
    }
    changeLastName(message : string){
        this.lastnameSource.next(message);
    }
}