import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslatorCallRoutingModule} from './translator-call-routing.module';
import {TranslatorCallComponent} from './translator-call.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [TranslatorCallComponent],
    imports: [
        CommonModule,
        TranslatorCallRoutingModule,
        IonicModule
    ]
})
export class TranslatorCallModule {
}
