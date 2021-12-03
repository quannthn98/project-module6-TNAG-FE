import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {MerchantProfile} from '../../model/merchant-profile';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merchant-pending',
  templateUrl: './merchant-pending.component.html',
  styleUrls: ['./merchant-pending.component.css']
})
export class MerchantPendingComponent implements OnInit {
  id: number;
  idUpdate: number;
  merchants: MerchantProfile[] = [];
  approvingMerchant: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getMerchantPending();
  }

  getMerchantPending() {
    this.userService.getPendingMerchant().subscribe((data: any) => {
      this.merchants = data.content;
    }, error => {
      console.log(error);
    });
  }

  getId(id: number) {
    this.id = id;
    this.getMerchantById(this.id);
  }

  getMerchantById(id: number) {
    this.userService.getMerchantById(id).subscribe((user: any) => {
      this.approvingMerchant = user;
    });
  }

  approvalMerchant() {
    this.userService.approvalMerchant(this.id).subscribe(() => {
      // this.router.navigate(['/admin/pending']);
      this.getMerchantPending();
      this.sweetalert2();
    });
  }

  blockMerchant() {
    this.userService.blockMerchant(this.id).subscribe(() => {
      this.getMerchantPending();
      this.sweetalert2();
    });
  }
  sweetalert2() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Thay đổi đã được lưu',
      showConfirmButton: false,
      timer: 1000
    });
  }
}
