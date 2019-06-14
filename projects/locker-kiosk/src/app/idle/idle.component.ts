import { Component, OnInit, HostListener } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {DataService} from '../data.service';

@Component({
  selector: 'app-idle',
  templateUrl: './idle.component.html',
  styleUrls: ['./idle.component.scss']
})
export class IdleComponent implements OnInit {
  message : string;
  constructor(private http: HttpClient,
    // private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }
  card_number = ""

  ngOnInit() {
    // this.data.currentMessage.subscribe(message => this.message = message);
  }
  @HostListener('document:keydown',['$event'])onkeydownHandler(event: KeyboardEvent){
    if (event.key === "Enter"){
      // alert(this.card_number)
      // this.data.changeMessage(this.card_number);
      this.card_number = "";
      this.router.navigate(['/browse-option'])

    }
    else{
      if("1234567890_".includes(event.key)){
        this.card_number = this.card_number + event.key
      }
    }
  }
  
}
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
