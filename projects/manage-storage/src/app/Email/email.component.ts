import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

    AddEmail : String;
    Container : String;
    DeleteEmail : String;
    constructor(private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location) { }

    ngOnInit() {
        // this.DeleteEmail = "";
    }
    submitForm() {
        
        let endpoint = "https://smartlocker.azurewebsites.net/api/admin/EditSendEmailContact";
        this.http.post<any>(endpoint, {
            "AddReceiver": this.AddEmail,
            "ReceiverContainer": this.Container,
            "DeleteReceiver" : this.DeleteEmail
        }).subscribe(data => {
            console.log(data)
            this.router.navigate(['/'])
        })
    }

    back() {
        this.location.back();
    }

}
