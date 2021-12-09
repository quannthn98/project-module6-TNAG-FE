import {Component, OnInit} from '@angular/core';
import {Order} from '../../model/order';
import {OrderService} from '../../service/order.service';
import {AlertService} from '../../service/alert.service';
import {OrderDetail} from '../../model/order-detail';
import {OrderStatus} from '../../model/order-status';
import {SocketService} from "../../service/socket/socket.service";

@Component({
  selector: 'app-shipper-order',
  templateUrl: './shipper-order.component.html',
  styleUrls: ['./shipper-order.component.css']
})
export class ShipperOrderComponent implements OnInit {
  orders: Order[] = [];
  orderDetail: OrderDetail[] = [];
  totalPayment: number;
  shippingStatus: OrderStatus;
  pickedOrder: Order;

  constructor(private orderService: OrderService,
              private alertService: AlertService,
              private socketService: SocketService) {
  }

  ngOnInit() {
    this.getCreatedOrder();
    this.getShippingStatus();
    this.socketService.connectToOrders()
  }

  getCreatedOrder() {
    this.orderService.getCreatedOrder().subscribe((data: any) => {
      this.socketService.orders = data.content;
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
    this.orderService.deliveryConfirmOrder(this.shippingStatus, this.pickedOrder.id).subscribe(() => {
      this.getCreatedOrder();
    }, error => {
      this.alertService.alertError('Xác nhận sai rồi');
    });
  }
}
