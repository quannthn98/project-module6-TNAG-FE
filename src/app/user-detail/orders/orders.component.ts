import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../service/order.service';
import {Order} from '../../model/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrdersByUser().subscribe((data: any) => {
      console.log(data.content);
      this.orders = data.content;
    });
  }


}
