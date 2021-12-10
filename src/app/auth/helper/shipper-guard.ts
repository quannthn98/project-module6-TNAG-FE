import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../service/authentication.service';
import {AlertService} from '../../service/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ShipperGuard implements CanActivate {
  isShipper = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private alertService: AlertService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authenticationService.currentUserValue;
    const roles = currentUser.roles;
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].authority === 'ROLE_SHIPPER') {
        this.isShipper = true;
        break;
      }
    }
    if (!this.isShipper) {
      this.router.navigateByUrl('/');
      this.alertService.alertError('Bạn không thể truy cập đường dẫn này');
      return false;
    }
    return true;
  }
}
