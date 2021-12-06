import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
newUser: User = {};
  constructor(private userService: UserService,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  submitUser(createUserForm) {
    const formData = new FormData();
    formData.append('name', createUserForm.value.username);
    formData.append('password', createUserForm.value.password);
    formData.append('email', createUserForm.value.email);
    formData.append('fullName', createUserForm.value.fullName);
    formData.append('phone', createUserForm.value.phoneNumber);
    formData.append('sex', createUserForm.value.sex);
    formData.append('address', createUserForm.value.address);
    this.userService.createUser(formData).subscribe(() => {
      this.router.navigate(['/login']);
      this.alertService.alertSuccess('Đăng ký thành công, vui lòng đăng nhập để tiếp tục mua hàng');
    }, error => {
      this.alertService.alertError('Đăng ký không thành công, vui lòng kiểm tra lại các trường dữ liệu bạn vừa nhập');
    });
  }
}
