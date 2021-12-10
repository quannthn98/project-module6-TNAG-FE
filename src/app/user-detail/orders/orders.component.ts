import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../service/order.service';
import {Order} from '../../model/order';
import {OrderDetail} from '../../model/order-detail';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  orderDetail: OrderDetail[] = [];
  totalPayment: number;
  discount: number;

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

  getOrderDetail(index: number) {
    this.totalPayment = this.orders[index].totalPayment;
    this.orderDetail = this.orders[index].ordersDetails;
    this.discount = this.orders[index].coupon.discount;
  }


}
