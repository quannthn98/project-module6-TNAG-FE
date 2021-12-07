import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../service/order.service';
import {Order} from '../../model/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
id: number;
orders: Order[] = [];
  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService) {
    activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
      this.getOrderByMerchant(this.id);
    });
  }

  ngOnInit() {}
  getOrderByMerchant(id: number) {
    this.orderService.getOrderByMerchant(id).subscribe((data: any) => {
      this.orders = data.content;
      console.log(this.orders);
    }, error => {
      console.log(error);
    });
  }
}
