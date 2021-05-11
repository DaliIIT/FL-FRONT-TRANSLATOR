import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadChildren: () =>
            import('src/app/pages/admin/admin-home/admin-home.module').then((m) => m.AdminHomeModule),
    },
    {
        path: 'add',
        loadChildren: () =>
            import('src/app/pages/admin/admin-add-edit/admin-add-edit.module').then((m) => m.AdminAddEditModule),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
