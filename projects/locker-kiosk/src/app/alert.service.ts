import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AlertService {

    constructor(
        private http: HttpClient,

    ) { }
    dateAlert(msg: string, duration: number) {
        var w = window.open('', '', "left=910, top=490,width=200,height=100")
        w.document.write(msg)
        w.focus()
        setTimeout(function () { w.close(); }, duration);
    }
}


