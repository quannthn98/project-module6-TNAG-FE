import {Component, OnInit} from '@angular/core';
import {UserAddress} from '../../model/user-address';
import {UserService} from '../../service/user.service';
import {NgForm} from '@angular/forms';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addresses: UserAddress[] = [];
  targetAddress: UserAddress = {};
  targetIndex: number;

  constructor(private userService: UserService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getUserDeliverAddress();
  }

  getUserDeliverAddress() {
    this.userService.getAllDeliverAddressByUser().subscribe((data: any) => {
      this.addresses = data;
      console.log(data);
    });
  }

  addNewAddress(createForm: NgForm) {
    this.userService.addNewDeliverAddress(createForm.value).subscribe(data => {
      this.alertService.alertSuccess('Thêm mới thành công');
      this.getUserDeliverAddress();
      createForm.resetForm();
    });
  }

  focusTarget(index: number) {
    this.targetIndex = index;
    this.targetAddress = this.addresses[index];
  }

  clearForm(createForm: NgForm) {
    createForm.resetForm();
  }

  deleteAddress() {
    this.userService.deleteDeliverAddress(this.targetAddress.id).subscribe(data => {
      this.alertService.alertSuccess('Xoá thành công');
      this.getUserDeliverAddress();
    });
  }


}
