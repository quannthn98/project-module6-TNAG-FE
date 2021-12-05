import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../service/authentication.service';
import {AlertService} from '../../service/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private alertService: AlertService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.authenticationService.logout();
          this.alertService.alertError('Bạn cần đăng nhập trước khi tiếp tục');
        } else if (err.status === 403) {
          this.alertService.alertError('Bạn không có quyền truy cập vào trang này');
        }
      }
    }));
  }
}
