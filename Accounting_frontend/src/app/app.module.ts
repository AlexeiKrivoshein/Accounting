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
import { TemplateModule } from 'src/template/template.module';

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
    TemplateModule,
    NotifyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
