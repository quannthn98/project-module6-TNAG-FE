import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../service/order.service';
import {Order} from '../../model/order';
import {OrderDetail} from '../../model/order-detail';
import {SocketService} from '../../service/socket/socket.service';
import {AuthenticationService} from '../../service/authentication.service';
import {AlertService} from '../../service/alert.service';

declare var $: any;

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
  infoOrder: Order;

  constructor(private orderService: OrderService,
              private socketService: SocketService,
              private alertService: AlertService,
              private authenticationService: AuthenticationService) {
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
    this.infoOrder = this.orders[index];
    this.totalPayment = this.orders[index].totalPayment;
    this.orderDetail = this.orders[index].ordersDetails;
    this.discount = this.orders[index].coupon.discount;
  }


  canceledOrder(value: string) {
    if (!(value == null || value === '')) {
      this.infoOrder.note += '\n(' + value + ' )';
    }
    this.orderService.cancellationOrder(this.infoOrder).subscribe(() => {
      this.socketService.sendNotification(`Đơn hàng ${this.infoOrder.id} đã bị huỷ, lý do: ${this.infoOrder.note}`, this.authenticationService.currentUserValue.id, this.infoOrder.merchant.id);
      this.getAllOrders();
      $('#note').val('');
      this.alertService.alertSuccess('Hủy đơn hàng thành công');
    }, error => {
      this.alertService.alertError('Hủy đơn hàng thất bại');
    });
  }
}
