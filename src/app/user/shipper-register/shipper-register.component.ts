import {Component, OnInit} from '@angular/core';
import {ShipperProfile} from '../../model/shipper-profile';
import {AuthenticationService} from '../../service/authentication.service';
import {UserService} from '../../service/user.service';
import {AlertService} from '../../service/alert.service';
import {SocketService} from '../../service/socket/socket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shipper-register',
  templateUrl: './shipper-register.component.html',
  styleUrls: ['./shipper-register.component.css']
})
export class ShipperRegisterComponent implements OnInit {
  shipperProfile: ShipperProfile = {};
  driverLicense: any;
  idFront: any;
  idBack: any;
  ownerCertificate: any;
  profession: string;


  constructor(private userService: UserService,
              private alertService: AlertService,
              private socketService: SocketService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.socketService.connectToNotify();
  }

  handleDriverLicenseInput(event) {
    this.driverLicense = (event.target).files[0];
  }

  handleIdFrontInput(event) {
    this.idFront = (event.target).files[0];
  }

  handleIdBackInput(event) {
    this.idBack = (event.target).files[0];
  }

  handleCertificateInput(event) {
    this.ownerCertificate = (event.target).files[0];
  }

  submit() {
    const formData = new FormData();
    formData.append('driverLicense', this.driverLicense);
    formData.append('idCardFront', this.idFront);
    formData.append('idCardBack', this.idBack);
    formData.append('vehicleOwnershipCertificate', this.ownerCertificate);
    formData.append('profession', this.profession);
    this.userService.shipperRegister(formData).subscribe(data => {
      this.alertService.alertSuccess('Đăng ký thành công, yêu cầu của bạn sẽ được phê duyệt trong 1 ngày làm việc');
      this.socketService.sendNotification(`Đơn yêu cầu làm đối tác vận chuyển từ shipper ${this.authenticationService.currentUserValue.username}`, this.authenticationService.currentUserValue.id, 1);
      this.router.navigateByUrl('/');
      console.log(data);
    });
  }
}

