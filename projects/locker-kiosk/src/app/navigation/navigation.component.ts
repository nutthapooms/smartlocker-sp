import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isHome: boolean = false;
  message : string;
  page_state = '';
  constructor(private location: Location,
    private http : HttpClient,
    private router: Router,
    private data: DataService,
    private pagestate: DataService

  ) { }
  card_number = ""
  enterCheck = 1;
  ngOnInit() {
    if (this.location.path() == '' ||this.location.path() == '/return-items' ){
      document.getElementById("logOutIcon").style.visibility = 'hidden';
      document.getElementById("logOut").innerHTML = ""; 
      document.getElementById("backBtn").style.visibility = 'hidden';
    }
    else {
      document.getElementById("backBtn").style.visibility = 'visible';
      document.getElementById("logOutIcon").style.visibility = 'visible';
    }

  }
  @HostListener('document:keydown', ['$event']) onkeydownHandler(event: KeyboardEvent) {
    if(this.location.path() != '/return-items' ){
      if (event.key === "Enter") { 
        // alert(this.card_number)
        // this.data.changeMessage(this.card_number);
        if (this.enterCheck == 1) {
          document.getElementById("backBtn").style.visibility = 'visible';
          document.getElementById("logOutIcon").style.visibility = 'visible';
          document.getElementById("logOut").innerHTML = "ID: " + this.card_number + " Log out";
          this.data.changeMessage(this.card_number);
          this.http.get("http://localhost:8080/api/admin/finduser/" + this.card_number).subscribe(
            data => {
              console.log(data);
            }
          )
          this.enterCheck = 0;
          this.router.navigate(['/browse-option']);
  
        }
      }
      else {
        if ("1234567890_".includes(event.key)) {
          this.card_number = this.card_number + event.key;
        }
      }
      
    }
    
  }
  back() {
    if (this.location.path() == '/browse-option' || this.location.path() == '/return-items'){
      document.getElementById("logOutIcon").style.visibility = 'hidden';
      document.getElementById("logOut").innerHTML = ""; 
      document.getElementById("backBtn").style.visibility = 'hidden';
      this.enterCheck = 1;
      this.card_number = "";
      this.router.navigate(['/']);
    }
    else{
    this.location.back();
    }
  }
  out() {
    document.getElementById("logOutIcon").style.visibility = 'hidden';
    document.getElementById("logOut").innerHTML = "";
    document.getElementById("backBtn").style.visibility = 'hidden';
    this.enterCheck = 1;
    this.card_number = "";
    this.router.navigate(['/']);
  }
}

