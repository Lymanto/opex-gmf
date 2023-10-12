import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { NewRequestComponent } from './pages/dashboard/new-request/new-request.component';
import { LayoutComponent } from './component/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { TextareaComponent } from './component/Form/textarea/textarea.component';
import { ItemComponent } from './component/item/item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './component/modal/modal.component';

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
    NewRequestComponent,
    LayoutComponent,
    LoginComponent,
    TextareaComponent,
    ItemComponent,
    ModalComponent,
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
  ],
})
export class AppModule {}
