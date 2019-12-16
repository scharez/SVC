import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  jwtHelper: JwtHelperService = new JwtHelperService();


  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = JSON.parse(localStorage.getItem('user'));
    const expectedRoles: string[] = route.data.roles;

    if (user) {
      // check if route is restricted by role
      if (!this.isAuthenticated() || (expectedRoles.indexOf(user.role) < 0)) {
        // role not authorised or token not valid so redirect to login page
        this.router.navigate(['/login']);
        console.log('not allowed');
        return false;
      }
      // authorised so return true
      return true;
    }
  }

  public isAuthenticated(): boolean {

    const user = JSON.parse(localStorage.getItem('user'));

    return !this.jwtHelper.isTokenExpired(user.token);
  }

}
