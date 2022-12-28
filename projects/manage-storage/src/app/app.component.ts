import { Component } from '@angular/core';
import { GlobalService } from 'src/app/shared/global.service';
import { MsalService } from '@azure/msal-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isIframe = false;
  loginDisplay = false;
  title = 'manage-storage';
  constructor(private gs: GlobalService, private authService: MsalService) {
    // gs is instance of GlobalService created at bootstrap
  }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    // this.login()
  }

  login() {
    this.authService.loginPopup()
      .subscribe({
        next: (result) => {
          console.log(result);
          this.setLoginDisplay();
        },
        error: (error) => console.log(error)
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}
