import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminAddEditComponent} from './admin-add-edit.component';


const routes: Routes = [
    {
        path: '',
        component: AdminAddEditComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminAddEditRoutingModule {
}
