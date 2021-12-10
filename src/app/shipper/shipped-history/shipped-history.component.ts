import {Component, OnInit} from '@angular/core';
import {Order} from '../../model/order';
import {OrderDetail} from '../../model/order-detail';
import {OrderService} from '../../service/order.service';
import {OrderStatus} from '../../model/order-status';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-shipped-history',
  templateUrl: './shipped-history.component.html',
  styleUrls: ['./shipped-history.component.css']
})
export class ShippedHistoryComponent implements OnInit {
  orders: Order[] = [];
  orderDetail: OrderDetail[] = [];
  totalPayment: number;
  pickedOrder: Order;
  shippingStatus: OrderStatus;

  constructor(private orderService: OrderService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getOrderByShipper();
    this.getCompletedStatus();
  }

  getOrderByShipper() {
    this.orderService.getOrderByShipper().subscribe((data: any) => {
      this.orders = data.content;
    }, error => {
      console.log(error);
    });
  }
  getCompletedStatus() {
    this.orderService.getAllOrderStatus().subscribe((data: any) => {
      const allStatus: OrderStatus[] = data.content;
      for (let i = 0; i < allStatus.length; i++) {
        if (allStatus[i].name === 'COMPLETED' ) {
          this.shippingStatus = allStatus[i];
          break;
        }
      }
    }, error => {
      this.alertService.alertError('Lỗi lấy status');
    });
  }

  getOrderDetail(index: number) {
    this.pickedOrder = this.orders[index];
    this.totalPayment = this.orders[index].totalPayment;
    this.orderDetail = this.orders[index].ordersDetails;
  }

  delivered() {
    this.orderService.deliveryConfirmOrder(this.shippingStatus, this.pickedOrder.id).subscribe(() => {
      this.getOrderByShipper();
    }, error => {
      this.alertService.alertError('Lỗi ở deliveryConfirmOrder bạn ơi');
    });
  }
}
