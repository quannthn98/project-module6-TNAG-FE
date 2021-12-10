import {Component, OnInit} from '@angular/core';
import {Order} from '../../model/order';
import {OrderDetail} from '../../model/order-detail';
import {OrderService} from '../../service/order.service';

@Component({
  selector: 'app-shipped-history',
  templateUrl: './shipped-history.component.html',
  styleUrls: ['./shipped-history.component.css']
})
export class ShippedHistoryComponent implements OnInit {
  orders: Order[] = [];
  orderDetail: OrderDetail[] = [];
  totalPayment = 0;
  pickedOrder: Order;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.getOrderByShipper();
  }

  getOrderByShipper() {
    this.orderService.getOrderByShipper().subscribe((data: any) => {
      this.orders = data.content;
    }, error => {
      console.log(error);
    });
  }

  getOrderDetail(index: number) {
    this.pickedOrder = this.orders[index];
    this.totalPayment = this.orders[index].totalPayment;
    this.orderDetail = this.orders[index].ordersDetails;
  }
}
