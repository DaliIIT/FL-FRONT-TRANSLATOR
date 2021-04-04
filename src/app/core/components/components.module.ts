import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatePickerComponent} from 'src/app/core/components/date-picker.component';
import {IonicModule} from '@ionic/angular';
import {SelectComponent} from 'src/app/core/components/select.component';


@NgModule({
    declarations: [DatePickerComponent, SelectComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [DatePickerComponent, SelectComponent]
})
export class ComponentsModule {
}
