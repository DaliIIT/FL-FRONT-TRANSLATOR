import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatePickerComponent} from 'src/app/core/components/date-picker.component';
import {IonicModule} from '@ionic/angular';
import {SelectComponent} from 'src/app/core/components/select.component';
import {NavBarComponent} from '@core/components/nav-bar/nav-bar.component';


@NgModule({
    declarations: [DatePickerComponent, SelectComponent, NavBarComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [DatePickerComponent, SelectComponent, NavBarComponent]
})
export class ComponentsModule {
}
