import {UserAddress} from './user-address';
import {OrderDetail} from './order-detail';
import {User} from './user';

export interface Order {
  id?: number;
  orderTime?: any;
  finishedTime?: any;
  address?: UserAddress;
  totalPayment?: number;
  status?: any;
  coupon?: any;
  shipper?: any;
  orderDetail?: OrderDetail[];
  merchant?: User;

}
