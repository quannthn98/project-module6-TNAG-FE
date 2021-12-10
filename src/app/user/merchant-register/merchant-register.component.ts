import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {AlertService} from '../../service/alert.service';
import {SocketService} from '../../service/socket/socket.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-merchant-register',
  templateUrl: './merchant-register.component.html',
  styleUrls: ['./merchant-register.component.css']
})
export class MerchantRegisterComponent implements OnInit {
  id: number;
  open: number;
  close: number;

  merchantForm = new FormGroup({
    name: new FormControl(),
    address: new FormControl(),
    hotline: new FormControl(),
    openHours: new FormControl(),
    description: new FormControl()
  });

  constructor(private userService: UserService,
              private router: Router,
              private alertService: AlertService,
              private socketService: SocketService,
              private authenticationService: AuthenticationService) {
    this.id = JSON.parse(localStorage.user).id;
    if (this.id == null) {
      this.router.navigateByUrl('login');
    }
  }

  ngOnInit() {

  }

  submit() {
    this.socketService.connectToNotify();
    this.userService.registerMerchant(this.id, this.merchantForm.value).subscribe((data: any) => {
      if (this.socketService.stompClient != null) {
        this.socketService.sendNotification(`Đơn đăng ký làm đối tác vận chuyển mới từ user ${this.authenticationService.currentUserValue.username}`,
          this.authenticationService.currentUserValue.id, 1);
      }
      this.alertService.alertSuccess('Đăng ký bán hàng thành công, yêu cầu của bạn sẽ được admin phê duyệt trong 1 ngày làm việc');
      this.router.navigateByUrl('/');
    });
  }
}
