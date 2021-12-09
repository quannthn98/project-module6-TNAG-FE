import {UserAddress} from './user-address';
import {OrderDetail} from './order-detail';
import {User} from './user';
import {OrderStatus} from './order-status';

export interface Order {
  id?: number;
  orderTime?: any;
  finishedTime?: any;
  address?: UserAddress;
  totalPayment?: number;
  orderStatus?: OrderStatus;
  coupon?: any;
  shipper?: any;
  ordersDetails?: OrderDetail[];
  merchant?: User;
  note?: string;

}
