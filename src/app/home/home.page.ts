import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

const { Device } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  editForm: FormGroup;
  getEditForm: any = []

  constructor(private formBuilder: FormBuilder, private storage: Storage, private router: Router, private alertController: AlertController) {


  }

  // ionViewWillEnter() {
  //   this.getUsers()
  // }
  // getUsers() {
  //   setTimeout(() => {
  //     this.storage.get('loggedInUser').then((val) => {
  //       if (val)
  //         this.getEditForm = val
  //       console.log(this.getEditForm)
  //     });
  //   }, 500);

  // }
  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.storage.get('loggedInUser').then((val) => {
      if (val)
        this.getEditForm = val[0]
      console.log(this.getEditForm)
    });
  }

  // async _getDeviceInfo() {
  //   const info = await Device.getInfo();
  //   console.log(info);

  // }

  saveEditDetail() {
    if (this.editForm.value.password == this.editForm.value.confirmPassword) {
      console.log(this.editForm.value)
      let allUserData: any = []
      setTimeout(() => {
        this.storage.get('createdAccount').then((val) => {
          if (val)
            allUserData = val
          console.log(allUserData)
          for (let index = 0; index < allUserData.length; index++) {
            if (this.getEditForm.email == allUserData[index].email) {
              allUserData[index].password = this.editForm.value.password;
              allUserData[index].name = this.editForm.value.name;
              allUserData[index].confirmPassword = this.editForm.value.password;

            }

          }
          this.getEditForm.name = this.editForm.value.name;
          this.getEditForm.password = this.editForm.value.password;
          this.getEditForm.confirmPassword = this.editForm.value.password;
          this.storage.set('loggedInUser', this.getEditForm);
          this.storage.set('createdAccount', allUserData);
        });

      }, 100);
      this.presentAlert("User Detail Updated")
    }
    else {
      this.presentAlert("Password didn't match")
    }
  }

  logOut() {
    this.storage.set('loggedInUser', '');
    this.router.navigate(['/login'])

  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  _addContacts() {
    this.router.navigate(['/add-contact'])
  }

  _contactList(){
    this.router.navigate(['/contact-list'])

  }

}
