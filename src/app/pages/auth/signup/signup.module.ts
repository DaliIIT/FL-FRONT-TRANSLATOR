import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SignupPageRoutingModule} from 'src/app/pages/auth/signup/signup-routing.module';

import {SignupPage} from 'src/app/pages/auth/signup/signup.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SignupPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [SignupPage]
})
export class SignupPageModule {
}
