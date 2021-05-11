import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TranslatorHomeComponent} from './translator-home.component';


const routes: Routes = [
    {
        path: '',
        component: TranslatorHomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TranslatorHomeRoutingModule {
}
