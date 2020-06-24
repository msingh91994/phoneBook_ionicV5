import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddContactPageRoutingModule } from './add-contact-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AddContactPage } from './add-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddContactPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddContactPage]
})
export class AddContactPageModule { }
