import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../service/order.service';
import {Order} from '../../model/order';
import {Dish} from '../../model/dish';
import {OrderStatus} from '../../model/order-status';
import {AlertService} from '../../service/alert.service';
import {SocketService} from '../../service/socket/socket.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  id: number;
  orders: Order[] = [];
  infoOrder: Order = {};
  infoDish: Dish[] = [];
  orderStatus: OrderStatus[] = [];
  currentStatus: string;
  totalPages: number;
  currentPage = 0;
  searchOrders: any;
  merchantId: number;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private alertService: AlertService,
              private socketService: SocketService,
              private authenticationService: AuthenticationService) {
    this.merchantId = JSON.parse(localStorage.user).id;

    activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
      this.getOrderByMerchant('');
      this.getAllStatus();
    });
  }

  ngOnInit() {
    this.socketService.connectToNotify();
  }

  getOrderByMerchant(statusName: string) {
    this.orderService.getOrderByMerchantAndStatus(statusName, this.currentPage, this.merchantId, this.searchOrders).subscribe((data: any) => {
      if (this.searchOrders == null || this.searchOrders === '') {
        this.orders = data.content;
        this.currentStatus = statusName;
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
      } else {
        this.orders = data;
        this.currentStatus = statusName;
        console.log(data);
      }
    }, error => {
      console.log(error);
    });
  }

  getOrder(id: number) {
    this.orderService.getOrderById(id).subscribe((order: Order) => {
      this.infoOrder = order;
      this.infoDish = order.ordersDetails;
    });
  }

  getAllStatus() {
    this.orderService.getAllOrderStatus().subscribe((data: any) => {
      this.orderStatus = data.content;
    }, error => {
      console.log(error);
    });
  }

  canceledOrder(value: string) {
    if (!(value == null || value === '')) {
      this.infoOrder.note += '\n(L?? do h???y: ' + value + ' )';
    }
    this.orderService.cancellationOrder(this.infoOrder).subscribe(() => {
      this.socketService.sendNotification(`????n h??ng ${this.infoOrder.id} ???? b??? hu???, l?? do: ${this.infoOrder.note}`, this.authenticationService.currentUserValue.id, this.infoOrder.user.id);
      this.getOrderByMerchant(this.currentStatus);
      this.alertService.alertSuccess('H???y ????n h??ng th??nh c??ng');
    }, error => {
      this.alertService.alertError('H???y ????n h??ng th???t b???i');
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  changePage(i: number) {
    this.orderService.getOrderByMerchantAndStatus(this.currentStatus, i, this.merchantId, this.searchOrders).subscribe((data: any) => {
      this.orders = data.content;
      this.currentPage = i;
      this.getOrderByMerchant(this.currentStatus);
    }, error => {
      this.alertService.alertError('L???i r???i');
    });
  }
}
