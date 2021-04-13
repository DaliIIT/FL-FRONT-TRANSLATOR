import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
        import('src/app/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },

  {
    path: 'patient-info/:id',
    loadChildren: () =>
      import('./pages/patient-info/patient-info.module').then(
        (m) => m.PatientInfoPageModule
      ),
  },

  {
    path: 'paymentlist',
    loadChildren: () =>
      import('./pages/paymentlist/paymentlist.module').then(
        (m) => m.PaymentlistPageModule
      ),
  },
  {
    path: 'cancel-appointment',
    loadChildren: () =>
      import('./pages/cancel-appointment/cancel-appointment.module').then(
        (m) => m.CancelAppointmentPageModule
      ),
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./pages/history/history.module').then((m) => m.HistoryPageModule),
  },

  {
    path: 'chat-list',
    loadChildren: () =>
      import('./pages/chat-list/chat-list.module').then(
        (m) => m.ChatListPageModule
      ),
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./pages/chat/chat.module').then((m) => m.ChatPageModule),
  },
  {
    path: 'review',
    loadChildren: () =>
      import('./pages/review/review.module').then((m) => m.ReviewPageModule),
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./pages/notification/notification.module').then(
        (m) => m.NotificationPageModule
      ),
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./pages/setting/setting.module').then((m) => m.SettingPageModule),
  },

  {
    path: 'call-modal',
    loadChildren: () =>
      import('./pages/call-modal/call-modal.module').then(
        (m) => m.CallModalPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
