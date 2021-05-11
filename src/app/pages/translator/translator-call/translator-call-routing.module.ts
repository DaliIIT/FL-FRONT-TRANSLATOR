import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TranslatorCallComponent} from './translator-call.component';


const routes: Routes = [
    {
        path: '',
        component: TranslatorCallComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TranslatorCallRoutingModule {
}
