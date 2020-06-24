import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ToastController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {

  private newContact: FormGroup;
  private pageName: string = "Add Contact";
  private buttonName: string = "Save Contact";
  private contactDetail: any;
  private fromPage: string

  constructor(private navCtrl: NavController, private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private storage: Storage, private toastController: ToastController) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.contactDetail = this.router.getCurrentNavigation().extras.state.params.contactDetail;
        this.fromPage = this.router.getCurrentNavigation().extras.state.params.fromPage;
      }
    })

  }

  ngOnInit() {
    this.newContact = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      mobileNo: ['', Validators.required]
    });
    if (this.fromPage == 'contactList') {
      this.pageName = 'Contact Detail';
      this.buttonName = 'Update Contact'
      this.newContact = this.formBuilder.group({
        firstName: [this.contactDetail.firstName, [Validators.required]],
        lastName: [this.contactDetail.lastName],
        mobileNo: [this.contactDetail.mobileNo, Validators.required],
        seq: [this.contactDetail.seq, Validators.required],
      })

    }
  }

  _saveContact() {
    if (this.pageName == 'Add Contact') {
      console.log(this.newContact.value)

      let addContact: any = [];
      this.storage.get('createdContact').then((val) => {
        if (val)
          addContact = val
      });
      setTimeout(() => {
        if (addContact.filter(({ mobileNo }) => mobileNo == this.newContact.value.mobileNo).length >= 1) {
          // console.log('user alredy exist')
          this.presentToast('Mobile no. already exist')
        } else {
          this.newContact.value.seq = addContact.length
          addContact.push(this.newContact.value)
          this.storage.set('createdContact', addContact)
          this.presentToast('Contact created');
          this.router.navigate(['/home'])
        }
      }, 100)
    } else {
      this._updateContact()
    }
  }

  _updateContact() {
    let updateContact: any = [];
    this.storage.get('createdContact').then((val) => {
      if (val)
        updateContact = val
      console.log(updateContact)

      for (let i = 0; i < updateContact.length; i++) {
        if (this.newContact.value.seq == updateContact[i].seq) {
          updateContact[i].firstName = this.newContact.value.firstName;
          updateContact[i].lastName = this.newContact.value.lastName;
          updateContact[i].mobileNo = this.newContact.value.mobileNo;
        }

      }

      this.storage.set('createdContact', updateContact);
      this.navCtrl.navigateBack('/contact-list');
      this.presentToast('Contact Updated')
    });


  }

  _deleteContact() {
    let updateContact: any = [];
    this.storage.get('createdContact').then((val) => {
      if (val)
        updateContact = val
      console.log(updateContact)

      for (var i = 0; i < updateContact.length; i++) {
        if (updateContact[i].seq === this.newContact.value.seq) {
          updateContact.splice(i, 1);
        }
      }
      console.log(updateContact)
      this.storage.set('createdContact', updateContact);
      this.navCtrl.navigateBack('/contact-list');
      this.presentToast('Contact deleted successfully')
    });

  }


  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }



}
