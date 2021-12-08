import { Component, OnInit } from '@angular/core';
import {ShipperProfile} from '../../model/shipper-profile';
import {NgForm} from '@angular/forms';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-register-shipper',
  templateUrl: './register-shipper.component.html',
  styleUrls: ['./register-shipper.component.css']
})
export class RegisterShipperComponent implements OnInit {
  shipperProfile: ShipperProfile = {};
  driverLicense: any;
  idFront: any;
  idBack: any;
  ownerCertificate: any;
  profession: string;


  constructor(private userService: UserService) { }

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
      console.log(data);
    });
  }

}
