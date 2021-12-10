import {Component, OnInit} from '@angular/core';
import {Order} from '../../model/order';
import {OrderService} from '../../service/order.service';
import {AlertService} from '../../service/alert.service';
import {OrderDetail} from '../../model/order-detail';
import {OrderStatus} from '../../model/order-status';
import {Router} from '@angular/router';
import {SocketService} from '../../service/socket/socket.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-shipper-order',
  templateUrl: './shipper-order.component.html',
  styleUrls: ['./shipper-order.component.css']
})
export class ShipperOrderComponent implements OnInit {
  orders: Order[] = [];
  orderDetail: OrderDetail[] = [];
  totalPayment = 0;
  shippingStatus: OrderStatus;
  pickedOrder: Order;

  constructor(private orderService: OrderService,
              private alertService: AlertService,
              private router: Router,
              private socketService: SocketService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.getCreatedOrder();
    this.getShippingStatus();
  }

  getCreatedOrder() {
    this.orderService.getCreatedOrder().subscribe((data: any) => {
      this.orders = data.content;
      console.log(this.orders);
    }, error => {
      this.alertService.alertError('Lỗi rồi đó');
    });
  }

  getShippingStatus() {
    this.orderService.getAllOrderStatus().subscribe((data: any) => {
      const allStatus: OrderStatus[] = data.content;
      for (let i = 0; i < allStatus.length; i++) {
        if (allStatus[i].name === 'SHIPPING' ) {
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

  deliveryConfirm() {
    this.socketService.connectToNotify();
    this.orderService.deliveryConfirmOrder(this.shippingStatus, this.pickedOrder.id).subscribe((data) => {
      this.socketService.sendNotification(`Shipper ${this.authenticationService.currentUserValue.name} đã tiếp nhận đơn hàng của bạn`, data.shipper.id, data.user.id);
      this.socketService.sendNotification(`Shipper ${this.authenticationService.currentUserValue.name} đã tiếp nhận đơn hàng ${data.id}`, data.shipper.id, data.merchant.id);
      this.router.navigateByUrl(`/track/order/${data.id}`);
    }, error => {
      this.socketService.disconnect();
      this.alertService.alertError('Xác nhận sai rồi');
    });
  }
}
