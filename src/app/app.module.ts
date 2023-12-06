import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { RequestVerificationComponent } from './component/need-approval-detail/request-verification/request-verification.component';
import { ViewBudgetTableComponent } from './component/view-budget-table/view-budget-table.component';
import { ReallocationRequestComponent } from './pages/reallocation-budget/reallocation-request/reallocation-request.component';
import { RequestRealokasiComponent } from './pages/reallocation-budget/detail/request-realokasi/request-realokasi.component';
import { DetailComponent } from './pages/need-approval/detail/detail.component';
import { ReallocatonBudgetComponent } from './component/need-approval-detail/reallocaton-budget/reallocaton-budget.component';
import { RemarkComponent } from './component/need-approval-detail/remark/remark.component';
import { TrackingApprovalComponent } from './component/need-approval-detail/tracking-approval/tracking-approval.component';
import { CardComponent } from './component/card/card.component';
import { DetailRequestComponent } from './component/reallocation-budget/detail-request/detail-request.component';
import { RemarkComponent as RemarkReallocationComponent } from './component/reallocation-budget/remark/remark.component';
import { TrackingApprovalComponent as TrackingApprovalReallocationComponent } from './component/reallocation-budget/tracking-approval/tracking-approval.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { HttpSoeApiHeader } from 'src/providers/http-soe-api-header';
import { CommonModule } from '@angular/common';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloakUrl,
        realm: environment.realm,
        clientId: environment.keycloakClientId,
      },
      loadUserProfileAtStartUp: true,
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: ['assets/'],
      initOptions: {
        onLoad: 'login-required',
        // silentCheckSsoRedirectUri:
        //   window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

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
    DetailComponent,
    ReallocatonBudgetComponent,
    RemarkComponent,
    TrackingApprovalComponent,
    CardComponent,
    DetailRequestComponent,
    RemarkReallocationComponent,
    TrackingApprovalReallocationComponent,
    PaginationComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpSoeApiHeader,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    BrowserAnimationsModule,
    SelectBoxComponent,
    HttpClientModule,
    CKEditorModule,
    FormsModule,
    KeycloakAngularModule,
    CommonModule,
  ],
})
export class AppModule {}
