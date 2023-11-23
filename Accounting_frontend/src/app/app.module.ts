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
import { AccountModule } from 'src/account/account.module';
import { NotifyModule } from 'src/notify/notify.module';
import { CategoryModule } from 'src/category/category.module';
import { ContractorModule } from 'src/contractor/contractor.module';
import { MovementModule } from 'src/movement/movement.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BalanceModule } from 'src/balance/balance.module';
import { PlanModule } from 'src/plan/plan.module';

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
    MovementModule,
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
