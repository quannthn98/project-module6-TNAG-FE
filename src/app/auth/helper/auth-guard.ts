import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../service/authentication.service';
import {AlertService} from '../../service/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAdmin = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private alertService: AlertService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authenticationService.currentUserValue;
    const roles = currentUser.roles;
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].authority === 'ROLE_ADMIN') {
        this.isAdmin = true;
        break;
      }
    }
    if (!this.isAdmin) {
      this.router.navigateByUrl('/');
      this.alertService.alertError('Bạn không thể truy cập đường dẫn này');
      return false;
    }
    return true;
  }
}
