import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SignupPageRoutingModule} from './signup-routing.module';

import {SignupPage} from './signup.page';
import {CoreModule} from 'src/app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SignupPageRoutingModule,
    CoreModule
  ],
  declarations: [SignupPage],
  providers: []
})
export class SignupPageModule {}
