import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './dashboard/home/home.component';
import {WahlComponent} from './dashboard/wahl/wahl.component';
import {LoginComponent} from './login/login.component';
import {ElectionComponent} from './election/election.component';
import {AuthGuard} from './_guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'wahl', component: ElectionComponent, /* canActivate: [AuthGuard], data: { roles: ['ADMIN, Teacher']} */},
  {
    path: 'dashboard', component: DashboardComponent, /* canActivate: [AuthGuard], data: { roles: ['ADMIN'] } */
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'wahl', component: WahlComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
