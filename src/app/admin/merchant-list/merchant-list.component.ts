import {Component, OnInit} from '@angular/core';
import {MerchantProfile} from '../../model/merchant-profile';
import {UserService} from '../../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent implements OnInit {
  merchants: MerchantProfile[] = [];
  id: number;
  pickedMerchant: any;
  statusList: any;
  statusUpdate: string;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getAllMerchant();
    this.getAllStatus();
  }

  getAllMerchant() {
    this.userService.getAllMerchant().subscribe((data: any) => {
      this.merchants = data.content;
      console.log(this.merchants);
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
      this.pickedMerchant = user;
    });
  }

  getAllStatus() {
    this.userService.getAllStatus().subscribe((data: any) => {
      this.statusList = data.content;
      console.log(this.statusList);
    }, error => {
      console.log(error);
    });
  }


  updateStatus(name: string, id: number) {
    this.userService.updateStatusMerchant(id, name).subscribe(() => {
      this.getAllMerchant();
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

  search(searchValue: string) {
    if (searchValue === '') {
      this.getAllMerchant();
    } else {
      this.userService.findAllMerchantByName(searchValue).subscribe((data: any) => {
        this.merchants = data.content;
      }, error => {
        console.log(error);
      });
    }
  }
}
