import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'prefix'},
  {path: '', loadChildren: './pages/pages.module#PagesModule'},
  {path: 'login', component: LoginComponent},
  { path: '**', component:  NotFoundComponent},
  // {
  //   path: 'pages', component: PagesComponent,
  //   children: [
  //     { path: 'dashboard', component: DashboardComponent },
  //     { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
  //   ]
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // { path: '**', component:  NotFoundComponent},
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
