import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../service/order.service';
import {Order} from '../../model/order';
import {Dish} from '../../model/dish';
import {OrderStatus} from '../../model/order-status';
import {AlertService} from '../../service/alert.service';

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
  searchOrders: any;
  merchantId: number;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private alertService: AlertService) {
    this.merchantId = JSON.parse(localStorage.user).id;

    activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
      this.getOrderByMerchant('');
      this.getAllStatus();
    });
  }

  ngOnInit() {
  }

  getOrderByMerchant(statusName: string) {
    this.orderService.getOrderByMerchant(statusName,this.merchantId, this.searchOrders).subscribe((data: any) => {
      if(this.searchOrders == null || this.searchOrders == ''){
        //Gửi dạng page phải chấm content
        this.orders = data.content;
        this.currentStatus = statusName;
        console.log(data);
      }else {
        this.orders = data;
        this.currentStatus = statusName;
        console.log(data)
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
      this.infoOrder.note += '\n(Lý do hủy: ' + value + ' )';
    }
    this.orderService.cancellationOrder(this.infoOrder).subscribe(() => {
      this.getOrderByMerchant(this.currentStatus);
      this.alertService.alertSuccess('Hủy đơn hàng thành công');
    }, error => {
      this.alertService.alertError('Hủy đơn hàng thất bại');
    });
  }

}
