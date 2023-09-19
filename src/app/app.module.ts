import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { TableComponent } from './component/table/table.component';
import { TopnavComponent } from './component/topnav/topnav.component';
import { SelectBoxComponent } from './component/Form/select-box/select-box.component';

@NgModule({
  declarations: [AppComponent, SidebarComponent, TableComponent, TopnavComponent, SelectBoxComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
