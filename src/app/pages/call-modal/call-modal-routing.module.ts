import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallModalPage } from './call-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CallModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallModalPageRoutingModule {}
