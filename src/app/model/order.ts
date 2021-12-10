import {UserAddress} from './user-address';
import {OrderDetail} from './order-detail';
import {User} from './user';
import {OrderStatus} from './order-status';
import {ShipperProfile} from './shipper-profile';
import {Coupon} from './coupon';

export interface Order {
  id?: number;
  orderTime?: any;
  finishedTime?: any;
  address?: UserAddress;
  totalPayment?: number;
  orderStatus?: OrderStatus;
  coupon?: Coupon;
  shipper?: ShipperProfile;
  ordersDetails?: OrderDetail[];
  merchant?: User;
  user?: User;
  note?: string;

}
