import {Component, OnInit} from '@angular/core';
import {Merchant} from '../../model/merchant';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-merchant-pending',
  templateUrl: './merchant-pending.component.html',
  styleUrls: ['./merchant-pending.component.css']
})
export class MerchantPendingComponent implements OnInit {
  id: number;
  idUpdate: number;
  merchants: Merchant[] = [];
  approvingMerchant: any;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.getMerchantPending();
  }

  getMerchantPending() {
    this.userService.getPendingMerchant().subscribe((data: any) => {
      this.merchants = data.content;
      console.log(data.content);
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
      console.log(user);
      this.approvingMerchant = user;
    });
  }

  approvalMerchant() {
    this.userService.approvalMerchant(this.id).subscribe(data => {
      this.router.navigate(['/admin/pending']);
    });
  }

  blockMerchant() {
    this.userService.blockMerchant(this.id).subscribe(data => {
      this.router.navigate(['/admin/pending']);
    });
  }
}
