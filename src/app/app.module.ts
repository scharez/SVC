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
import {AuthGuard} from './_guard/auth.guard';
import { VotingresultsComponent } from './dashboard/home/voting-results/voting-results.component';
import { CandidateComponent } from './dashboard/candidate/candidate.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ChooseClassComponent } from './election/choose-class/choose-class.component';
import { FinishedComponent } from './election/finished/finished.component';
import { UploadCsvComponent } from './dashboard/home/upload-csv/upload-csv.component';
import { ElectedClassesComponent } from './dashboard/home/elected-classes/elected-classes.component';
import { ElectSettingsComponent } from './dashboard/home/elect-settings/elect-settings.component';
import {UpdateCandidatesComponent} from './dashboard/candidate/updateCandidates/updateCandidates.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    WahlComponent,
    LoginComponent,
    ElectionComponent,
    VotingresultsComponent,
    CandidateComponent,
    ChooseClassComponent,
    FinishedComponent
    UploadCsvComponent,
    ElectedClassesComponent,
    ElectSettingsComponent,
    UpdateCandidatesComponent
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
  entryComponents: [
    ChooseClassComponent,
    FinishedComponent
  ],
  providers: [HttpService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
