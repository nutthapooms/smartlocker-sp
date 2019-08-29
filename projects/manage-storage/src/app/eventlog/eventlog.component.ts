import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LoanDTO, SiteDTO, CountryDTO, ContainerDTO } from 'src/app/shared/model';
import { GetDtoService } from 'src/app/shared/get-dto.service';
import { Location } from '@angular/common';



@Component({
    selector: 'app-eventlog',
    templateUrl: './eventlog.component.html',
    styleUrls: ['./eventlog.component.scss']
})
export class EventLogComponent implements OnInit {
    containerId: string;
    loanlog: LoanDTO[]
    fullloanlog: LoanDTO[]
    siteId: string;
    countryId: string;
    country: CountryDTO;
    site: SiteDTO;
    container: ContainerDTO;
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private dto: GetDtoService,
        private location: Location
    ) { }

    ngOnInit() {
        this.siteId = this.route.snapshot.paramMap.get('siteId');
        this.countryId = this.route.snapshot.paramMap.get('countryId');
        this.containerId = this.route.snapshot.paramMap.get('containerId');
        this.http.get<Array<LoanDTO>>('https://smartlocker.azurewebsites.net/api/admin/loanlist/' + this.containerId).subscribe(data => {
            console.log(data);
            this.loanlog = data;
            this.fullloanlog = data;
        })
        this.dto.getDTO('countries', this.countryId).subscribe(data => this.country = data)
        this.dto.getDTO('sites', this.siteId).subscribe(data => this.site = data)
        this.dto.getDTO('containers', this.containerId).subscribe(data => this.container = data)

        let date = new Date();
        let logFilter_Placeholder = (<HTMLInputElement>document.getElementById("logFilter"));
        logFilter_Placeholder.value = date.getFullYear() + "-" + Math.floor(((date.getMonth() + 1) / 10)) + ((date.getMonth() + 1) % 10);

    }
    showUserProperty(badge_Id) {
        window.open('https://hoesql566.na.xom.com/BadgeEventAPI/api/Badge/ID/' + badge_Id);
        console.log("badge :" + badge_Id.toString());
    }
    currentLocation() {
        return this.location.path()
    }
    filteringLog() {
        let date = new Date();
        let logFilter = (<HTMLInputElement>document.getElementById("logFilter"));
        let filterDate = logFilter.value;
        if (this.fullloanlog != undefined) {
            console.log(filterDate)
            this.loanlog = this.fullloanlog.filter(function (el) {
                // console.log(el.loanDate);
                return new Date(el.loanDate).getMonth() == new Date(filterDate).getMonth() &&
                    new Date(el.loanDate).getFullYear() == new Date(filterDate).getFullYear();
            });
        }
    }

}