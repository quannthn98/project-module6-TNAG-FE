import {Component, OnInit} from '@angular/core';
import {ShipperProfile} from '../../model/shipper-profile';
import {UserToken} from '../../model/userToken';
import {AuthenticationService} from '../../service/authentication.service';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {AlertService} from '../../service/alert.service';

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
              private alertService: AlertService) { }

  ngOnInit() {
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
      this.alertService.alertSuccess('xong roi b oi');
      console.log(data);
    });
  }
}

