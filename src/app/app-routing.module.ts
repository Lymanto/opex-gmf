import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { RequestComponent } from './pages/request/request.component';
import { NewRequestComponent } from './pages/dashboard/new-request/new-request.component';

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
    path: 'request',
    component: RequestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
