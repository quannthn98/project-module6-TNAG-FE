import {Dish} from './dish';

export interface CartDetail {
  id?: number;
  dish?: Dish;
  quantity?: number;
  price?: number;
}
