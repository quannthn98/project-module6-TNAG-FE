import { Component, OnInit } from '@angular/core';
import {Order} from "../../model/order";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {AlertService} from "../../service/alert.service";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-merchant-order',
  templateUrl: './merchant-order.component.html',
  styleUrls: ['./merchant-order.component.css']
})
export class MerchantOrderComponent implements OnInit {
  searchOrders: any;
  orders: Order[] = [];
  merchantId: number;
  constructor(private userService: UserService,
              private orderService: OrderService,
              private router: Router,
              private alertService: AlertService) {
    this.merchantId = JSON.parse(localStorage.user).id;
    this.getOrderByMerchantId();
  }

  ngOnInit() {
  }

  getOrderByMerchantId(){
    this.orderService.getOrderByIdMerchant(this.merchantId,this.searchOrders).subscribe( (data: any) => {
      console.log(data.content);
      if(this.searchOrders == null || this.searchOrders == ''){
        //Gửi dạng page phải chấm content
        this.orders = data.content;
      }else {
        this.orders = data;
      }

    },error => {
      console.log(error);
      }
    );
  }

  // getOrderById(){
  //   this.orderService.getOrderByIdOrder(this.searchIdOrder).
  // }
}
