import { Component, OnInit, HostListener } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-idle',
  templateUrl: './idle.component.html',
  styleUrls: ['./idle.component.scss']
})
export class IdleComponent implements OnInit {

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
  }
  @HostListener('document:keydown',['$event'])onkeydownHandler(event: KeyboardEvent){
    if (event.key === "Enter"){
      alert(card_number)
      card_number = "";
      this.router.navigate(['/browse-option'])

    }
    else{
      if("1234567890_".includes(event.key)){
        card_number = card_number + event.key
      }
    }
  }
  
}
var card_number = ""
// document.addEventListener('keydown',function(event){
//   if(event.keyCode == 13){
//     alert("ENter: "+card_number);
//     card_number = "";
//     Enter = 1;
//   }
//   else {
//     card_number = card_number+event.key;
//   }
  
// });
