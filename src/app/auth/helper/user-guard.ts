import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../service/authentication.service';
import {AlertService} from '../../service/alert.service';

export class UserGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private alertService: AlertService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authenticationService.currentUserValue;
    const roles = currentUser.roles;
    if (currentUser == null) {
      this.router.navigateByUrl('/login');
      this.alertService.alertError('Bạn cần đăng nhập trước khi thực hiện hành động này');
      return false;
    }
    return true;
  }

}
