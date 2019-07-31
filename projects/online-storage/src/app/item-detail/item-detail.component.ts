import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { ItemResponse, CountryResponse, SiteResponse, ContainerResponse, ItemDetailResponse, CountryDTO, ItemDetailAvailabilityContainer, EmployeeDTO, EmployeeResponse } from '../../../../../src/app/shared/model';
import { DataService } from '../shared/data.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item: ItemDetailResponse = null;
  itemId: number;
  activeImage: number;
  userInfo : EmployeeDTO = null;
  activeSiteId: number = -1;
  activeContainerId: number = -1;
  activeCountryId: number = -1;

  activeCountry: ItemDetailAvailabilityContainer = new ItemDetailAvailabilityContainer();
  activeSite: SiteResponse = new SiteResponse();
  activeContainer: ContainerResponse = new ContainerResponse();

  constructor(private http: HttpClient,
    private data: DataService,
    private _route: ActivatedRoute,
    private _router: Router,
    private handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
     }
  username = "";
  lastname = "";
  displayName ="";
  
  ngOnInit() {
    
    this.data.currentName.subscribe(message => this.username = message);
    this.data.currentLastName.subscribe(message => this.lastname = message);
    this.displayName = this.username+" "+this.lastname;
    console.log("message: "+this.displayName);
    let headers = new HttpHeaders();
    this.http.get<EmployeeDTO>(`https://smartlocker.azurewebsites.net/api/admin/finduser/name/${this.displayName}`).subscribe(data =>{
      if(data != null){
        this.userInfo = data;
        headers = headers.set('Authorization', this.userInfo.BadgeId);  
      }
      else{
        headers = headers.set('Authorization', '1'); 
      }
    })


    
    headers = headers.set('Authorization', '1');  //temporary
    this.itemId = this._route.snapshot.params.itemId;
    this.http.get<ItemDetailResponse>(`https://smartlocker.azurewebsites.net/api/online/items/${this.itemId}`,{headers:headers}).subscribe(data => {
      this.item = data
      console.log(data)
      if(this.item.item.images.length > 0) {
        this.activeImage = this.item.item.images[0]
      }

      this._route.queryParams.subscribe(queries => {
        if (queries.countryId) this.activeCountryId = queries.countryId;
        if (queries.siteId) this.activeSiteId = queries.siteId;

        if (this.activeCountryId > -1) { this.activeCountry = this.item.availability.find(each => each.country.id == this.activeCountryId)}
        // if (this.activeSiteId > -1) { this.activeSite = this.activeCountry.sites.find(each => each..id == this.activeSiteId)}

      });

    }

    )
  }
  setActiveImage(imageId: number){
    this.activeImage = imageId;
  }

}
