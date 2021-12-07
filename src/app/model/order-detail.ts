import {Dish} from './dish';

export interface OrderDetail {
  dish?: Dish;
  price?: number;
  quantity?: number;
  total?: number;
}
