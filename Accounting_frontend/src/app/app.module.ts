import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ControlsModule } from 'src/controls/controls.module';
import { NotifyModule } from 'src/notify/notify.module';
import { OperationModule } from 'src/operation/operation.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BalanceModule } from 'src/balance/balance.module';
import { PlanModule } from 'src/plan/plan.module';
import { AccountModule } from 'src/dictionaries/account/account.module';
import { CategoryModule } from 'src/dictionaries/category/category.module';
import { ContractorModule } from 'src/dictionaries/contractor/contractor.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    ControlsModule,
    AccountModule,
    CategoryModule,
    ContractorModule,
    OperationModule,
    BalanceModule,
    PlanModule,
    NotifyModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
