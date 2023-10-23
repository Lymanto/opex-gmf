import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { TableComponent } from './component/table/table.component';
import { TopnavComponent } from './component/topnav/topnav.component';
import { InputTextComponent } from './component/Form/input-text/input-text.component';
import { InputDateComponent } from './component/Form/input-date/input-date.component';
import { ButtonComponent } from './component/button/button.component';
import { StatusPercentageComponent } from './component/status-percentage/status-percentage.component';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectBoxComponent } from './component/Form/select-box/select-box.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { NewRequestComponent as DashboardNewRequestComponent } from './pages/dashboard/new-request/new-request.component';
import { LayoutComponent } from './component/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { TextareaComponent } from './component/Form/textarea/textarea.component';
import { ItemComponent } from './component/item/item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './component/modal/modal.component';
import { CreateReallocationBudgetComponent } from './pages/dashboard/create-reallocation-budget/create-reallocation-budget.component';
import { NeedApprovalComponent } from './pages/need-approval/need-approval/need-approval.component';
import { GeneralComponent } from './pages/reallocation-budget/general/general.component';
import { RealokasiCorporateComponent } from './pages/reallocation-budget/realokasi-corporate/realokasi-corporate.component';
import { SummaryComponent } from './pages/report/summary/summary.component';
import { ViewBudgetComponent } from './pages/report/view-budget/view-budget.component';
import { PersonnelSummaryComponent } from './pages/report/personnel-summary/personnel-summary.component';
import { GuidanceApplicationComponent } from './pages/guidance-application/guidance-application.component';
import { FeedbackApplicationComponent } from './pages/feedback-application/feedback-application.component';
import { KursUsdComponent } from './pages/master-data/kurs-usd/kurs-usd.component';
import { SummaryComponent as SummaryMasterData } from './pages/master-data/summary/summary.component';
import { ViewBudgetComponent as ViewBudgetMasterData } from './pages/master-data/view-budget/view-budget.component';
import { ItemReallocationComponent } from './component/item-reallocation/item-reallocation.component';
import { StatusComponent } from './component/status/status.component';
import { RequestVerificationComponent } from './pages/need-approval/detail/request-verification/request-verification.component';
import { ViewBudgetTableComponent } from './component/view-budget-table/view-budget-table.component';
import { ReallocationRequestComponent } from './pages/reallocation-budget/reallocation-request/reallocation-request.component';
import { RequestRealokasiComponent } from './pages/reallocation-budget/detail/request-realokasi/request-realokasi.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TableComponent,
    TopnavComponent,
    InputTextComponent,
    InputDateComponent,
    ButtonComponent,
    StatusPercentageComponent,
    DashboardComponent,
    DashboardNewRequestComponent,
    LayoutComponent,
    LoginComponent,
    TextareaComponent,
    ItemComponent,
    ModalComponent,
    CreateReallocationBudgetComponent,
    NeedApprovalComponent,
    GeneralComponent,
    RealokasiCorporateComponent,
    SummaryComponent,
    ViewBudgetComponent,
    PersonnelSummaryComponent,
    GuidanceApplicationComponent,
    FeedbackApplicationComponent,
    KursUsdComponent,
    SummaryMasterData,
    ViewBudgetMasterData,
    ItemReallocationComponent,
    StatusComponent,

    RequestVerificationComponent,
    ViewBudgetTableComponent,
    ReallocationRequestComponent,
    RequestRealokasiComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    BrowserAnimationsModule,
    SelectBoxComponent,
    HttpClientModule,
  ],
})
export class AppModule {}
