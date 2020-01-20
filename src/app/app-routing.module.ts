import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './dashboard/home/home.component';
import {WahlComponent} from './dashboard/wahl/wahl.component';
import {LoginComponent} from './login/login.component';
import {ElectionComponent} from './election/election.component';
import {AuthGuard} from './_guard/auth.guard';
import {CandidateComponent} from './dashboard/candidate/candidate.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'dashboard', component: DashboardComponent, /* canActivate: [AuthGuard], data: { roles: ['ADMIN'] } */
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'wahl', component: WahlComponent},
      {path: 'candidates', component: CandidateComponent},
      {path: 'election', component: ElectionComponent, /* canActivate: [AuthGuard], data: { roles: ['ADMIN, Teacher']} */},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
