import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    IonicStorageModule.forRoot()
  ],
  exports: [RouterModule],
})
export class LoginPageRoutingModule { }
