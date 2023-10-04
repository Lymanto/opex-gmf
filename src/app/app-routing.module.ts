import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { NewRequestComponent } from './pages/dashboard/new-request/new-request.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'dashboard/new-request',
    component: NewRequestComponent,
  },
  {
    path: 'login',
    component: LoginComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
