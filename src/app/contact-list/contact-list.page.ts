import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.page.html',
  styleUrls: ['./contact-list.page.scss'],
})
export class ContactListPage implements OnInit {

  private contactList: any = [];
  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.storage.get('createdContact').then((val) => {
      if (val)
        this.contactList = val.sort(function (a, b) {
          return a.firstName - b.firstName;
        })
      console.log(this.contactList.sort((a, b) =>
        a.firstName - b.firstName
      ))
    });

  }

  _contactDetail(item: any) {
    console.log(item)
    let navigationExtras: NavigationExtras = {
      state: {
        params: {
          contactDetail: item,
          fromPage: 'contactList'
        }
      }
    };

    this.router.navigate(['/add-contact'], navigationExtras)
  }

}
