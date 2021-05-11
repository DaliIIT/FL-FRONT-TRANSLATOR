import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslatorProfileRoutingModule} from './translator-profile-routing.module';
import {TranslatorProfileComponent} from './translator-profile.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [TranslatorProfileComponent],
    imports: [
        CommonModule,
        TranslatorProfileRoutingModule,
        IonicModule
    ]
})
export class TranslatorProfileModule {
}
