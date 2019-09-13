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
  constructor(private http: HttpClient,
    private language: DataService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }
  ngOnInit() {
    this.language.changeLanguage("thai");
    this.thai();
  }

  thai(){
    this.language.changeLanguage("thai");
    console.log("thai");
    document.getElementById("ScanSerial_sub").innerHTML = "แสกนบาร์โค๊ดบนอุปกรณ์เพื่อคืน"
    document.getElementById("ScanCard_sub").innerHTML = "ส่องบัตรพนักงานเพื่อยืมอุปกรณ์"

  }
  eng(){
    this.language.changeLanguage("eng");
    console.log("eng");
    document.getElementById("ScanSerial_sub").innerHTML = "Scan barcode on item to return"
    document.getElementById("ScanCard_sub").innerHTML = "Tap ID card to borrow item"


  }
  return(){   
      this.router.navigate(['/return-items'])
  }
}
