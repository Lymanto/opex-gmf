import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { NewRequestComponent as DashboardNewRequestComponent } from './pages/dashboard/new-request/new-request.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateReallocationBudgetComponent } from './pages/dashboard/create-reallocation-budget/create-reallocation-budget.component';
import { NeedApprovalComponent } from './pages/need-approval/need-approval/need-approval.component';
import { GeneralComponent } from './pages/reallocation-budget/general/general.component';
import { RealokasiCorporateComponent } from './pages/reallocation-budget/realokasi-corporate/realokasi-corporate.component';
import { SummaryComponent } from './pages/report/summary/summary.component';
import { ViewBudgetComponent } from './pages/report/view-budget/view-budget.component';
import { PersonnelSummaryComponent } from './pages/report/personnel-summary/personnel-summary.component';
import { GuidanceApplicationComponent } from './pages/guidance-application/guidance-application.component';
import { FeedbackApplicationComponent } from './pages/feedback-application/feedback-application.component';
import { SummaryComponent as SummaryMasterData } from './pages/master-data/summary/summary.component';
import { ViewBudgetComponent as ViewBudgetMasterData } from './pages/master-data/view-budget/view-budget.component';
import { KursUsdComponent } from './pages/master-data/kurs-usd/kurs-usd.component';
import { RequestVerificationComponent } from './pages/need-approval/detail/request-verification/request-verification.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'dashboard/new-request',
    component: DashboardNewRequestComponent,
  },
  {
    path: 'dashboard/create-reallocation-budget',
    component: CreateReallocationBudgetComponent,
  },
  {
    path: 'need-approval',
    component: NeedApprovalComponent,
  },
  {
    path: 'need-approval/detail',
    component: RequestVerificationComponent,
  },
  {
    path: 'reallocation-budget/general',
    component: GeneralComponent,
  },
  {
    path: 'reallocation-budget/realokasi-corporate',
    component: RealokasiCorporateComponent,
  },
  {
    path: 'report/summary',
    component: SummaryComponent,
  },
  {
    path: 'report/view-budget',
    component: ViewBudgetComponent,
  },
  {
    path: 'report/personnel-summary',
    component: PersonnelSummaryComponent,
  },
  {
    path: 'guidance-application',
    component: GuidanceApplicationComponent,
  },
  {
    path: 'feedback-application',
    component: FeedbackApplicationComponent,
  },
  {
    path: 'master-data/summary',
    component: SummaryMasterData,
  },
  {
    path: 'master-data/view-budget',
    component: ViewBudgetMasterData,
  },
  {
    path: 'master-data/kurs-usd',
    component: KursUsdComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
