import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoogleChartsModule} from 'angular-google-charts';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './dashboard/home/home.component';
import { WahlComponent } from './dashboard/wahl/wahl.component';
import { LoginComponent } from './login/login.component';
import {MaterialModule} from './material/material.module';
import { ElectionComponent } from './election/election.component';
import {HttpService} from './_services/http.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    WahlComponent,
    LoginComponent,
    ElectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    GoogleChartsModule,
    MaterialModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
