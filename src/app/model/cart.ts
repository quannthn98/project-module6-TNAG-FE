import {CartDetail} from './cart-detail';

export interface Cart {
  id?: number;
  merchant?: any;
  user?: any;
  cartDetails?: CartDetail[];
}
