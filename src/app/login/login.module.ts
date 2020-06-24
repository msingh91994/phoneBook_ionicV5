import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { IonicStorageModule } from '@ionic/storage';


// import { GooglePlus } from '@ionic-native/google-plus/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule
  ],
  // providers: [GooglePlus],
  declarations: [LoginPage]
})
export class LoginPageModule { }
