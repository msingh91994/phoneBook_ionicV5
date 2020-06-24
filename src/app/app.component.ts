import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private details: any;
  private saveData: any = []
  contactDetails: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, private storage: Storage, private router: Router
  ) {
    this.initializeApp();
    this.contactDetails = {
      name: '',
      company: '',
      title: '',
      number: '',
      email: ''
    }

    // this.storage.get('loggedInUser').then(data => {
    //   console.log(data)
    //   if (data) {
    //     if (data[0].email)
    //       this.router.navigate(['/home'])
    //     else
    //       this.router.navigate(['/login'])
    //   }
    //   else
    this.router.navigate(['/home'])
    // })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
