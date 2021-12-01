import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Merchant} from '../../model/merchant';
import {log} from "util";

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
  id: number;
  merchant: Merchant;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
  }

  ngOnInit() {
    this.approvalMerchant(this.id);
  }

  approvalMerchant(id: number) {
    this.userService.approvalMerchant(id).subscribe(data => {
      this.merchant = data;
      console.log(data);
    });
  }

}
