import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authentication: AuthenticationService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
  }

  login(formLogin) {
    this.authentication.login(formLogin.value.username, formLogin.value.password).subscribe(() => {
      this.router.navigate(['/']);
    }, () => {
      document.getElementById('errorsLogin').innerHTML = 'Sai tên tài khoản hoặc mật khẩu !';
    })
    ;
  }
}
