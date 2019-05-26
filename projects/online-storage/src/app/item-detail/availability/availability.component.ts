import { Component, OnInit, Input } from '@angular/core';
import { ItemResponse, CountryResponse, SiteResponse, ContainerResponse } from 'src/app/shared/model';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {
  @Input() item: ItemResponse;
  @Input() activeCountry: CountryResponse = new CountryResponse();
  @Input() activeSite: SiteResponse = new SiteResponse();
  @Input() activeContainer: ContainerResponse = new ContainerResponse();
  constructor() { }

  ngOnInit() {
  }

}
