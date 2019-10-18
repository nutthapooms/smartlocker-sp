import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {
    constructor() { }
    dateAlert(msg : string, duration : number) {
        var w = window.open('', '', "left=910, top=490,width=200,height=100")
        w.document.write(msg)
        w.focus()
        setTimeout(function () { w.close(); }, duration);
    }
}