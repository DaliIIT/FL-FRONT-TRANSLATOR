import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SigninPageRoutingModule} from 'src/app/pages/auth/signin/signin-routing.module';

import {SigninPage} from 'src/app/pages/auth/signin/signin.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SigninPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SigninPage]
})
export class SigninPageModule {}
