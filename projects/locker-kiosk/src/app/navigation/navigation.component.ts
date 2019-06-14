import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataService} from '../data.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isHome: boolean = false;
  // message : string;
  constructor(private location: Location,
    private router: Router
    ) { }
  card_number = ""
    enterCheck = 1;
  ngOnInit() {
    document.getElementById("logOutIcon").style.visibility = 'hidden';
    document.getElementById("backBtn").style.visibility = 'hidden';

  }
  @HostListener('document:keydown',['$event'])onkeydownHandler(event: KeyboardEvent){
    if (event.key === "Enter"){

      // alert(this.card_number)
      // this.data.changeMessage(this.card_number);
      if(this.enterCheck ==1){
        document.getElementById("backBtn").style.visibility = 'visible';

        document.getElementById("logOutIcon").style.visibility = 'visible';
        document.getElementById("logOut").innerHTML = "ID: " + this.card_number+ " Log out";
        this.router.navigate(['/browse-option'])
        this.enterCheck = 0;
      }
    }
    else{
      if("1234567890_".includes(event.key)){
        this.card_number = this.card_number + event.key
      }
    }
  }
  
  back() {
    this.location.back()
  }
  out() {
    document.getElementById("logOutIcon").style.visibility = 'hidden';
    document.getElementById("logOut").innerHTML = "";
    document.getElementById("backBtn").style.visibility = 'hidden';    
    this.enterCheck = 1;
    this.card_number = "";
    this.router.navigate(['/'])
    
  }

}

