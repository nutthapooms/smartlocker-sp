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
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }
  // card_number = ""

  ngOnInit() {
    // this.data.currentMessage.subscribe(message => this.message = message);
  }
  return(){   
      this.router.navigate(['/return-items'])
  }
}
