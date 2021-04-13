import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SignupPageRoutingModule} from 'src/app/pages/auth/signup/signup-routing.module';

import {SignupPage} from 'src/app/pages/auth/signup/signup.page';
import {CoreModule} from 'src/app/core/core.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SignupPageRoutingModule,
        ReactiveFormsModule,
        CoreModule
    ],
    declarations: [SignupPage]
})
export class SignupPageModule {
}
