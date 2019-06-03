import { Component } from '@angular/core';
import { GlobalService } from 'src/app/shared/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'manage-storage';
  constructor(private gs: GlobalService) {
    // gs is instance of GlobalService created at bootstrap
  }

}
