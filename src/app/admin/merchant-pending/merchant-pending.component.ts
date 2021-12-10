import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {MerchantProfile} from '../../model/merchant-profile';
import Swal from 'sweetalert2';
import {SocketService} from '../../service/socket/socket.service';

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

  constructor(private userService: UserService,
              private socketService: SocketService) {
  }

  ngOnInit() {
    this.socketService.connectToNotify();
    this.getMerchantPending();
  }

  getMerchantPending() {
    this.userService.getPendingMerchant().subscribe((data: any) => {
      console.log(data.content);
      this.merchants = data.content;
    }, error => {
      console.log(error);
    });
  }

  getId(id: number) {
    this.id = id;
    this.getMerchantByUserId(this.id);
  }

  getMerchantByUserId(id: number) {
    this.userService.getMerchantByUserId(id).subscribe((user: any) => {
      this.approvingMerchant = user;
    });
  }

  approvalMerchant() {
    this.userService.approvalMerchant(this.id).subscribe(() => {
      this.socketService.sendNotification(`Đơn đăng ký Merchant của bạn đã được phê duyệt thành công, vui lòng đăng nhập lại để vào trang quản lý sản phẩm`, 1, this.id);
      this.getMerchantPending();
      this.sweetalert2();
    });
  }

  blockMerchant() {
    this.userService.blockMerchant(this.id).subscribe(() => {
      this.socketService.sendNotification(`Đơn đăng ký Merchant đã bị từ chối, lý do: thông tin của bạn chưa chính xác, vui lòng đọc lại hướng dẫn và các quy định khi đăng ký của hàng`, 1, this.id);
      this.getMerchantPending();
      this.sweetalert2();
    });
  }
  sweetalert2() {
    Swal.fire({
      position: 'top-end',
      width: 300,
      icon: 'success',
      toast: true,
      text: 'Thay đổi đã được lưu',
      showConfirmButton: false,
      timer: 1000
    });
  }

  search(searchValue: string) {
    if (searchValue === '') {
      this.getMerchantPending();
    } else {
      this.userService.findAllMerchantByName(searchValue).subscribe((data: any) => {
        this.merchants = data.content;
      }, error => {
        console.log(error);
      });
    }
  }
}
