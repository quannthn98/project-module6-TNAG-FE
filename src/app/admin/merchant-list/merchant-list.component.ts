import {Component, OnInit} from '@angular/core';

import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent implements OnInit {
  merchants: User[] = [];

  constructor(private userService: UserService, private router: Router) {
    this.getAllMerchants();
  }

  ngOnInit() {

  }

  getAllMerchants() {
    this.userService.getAllMerchant().subscribe((data: any) => {
        console.log(data.content);
        this.merchants = data.content;
      }, error => {
        console.log(error);
      }
    );
  }
}
