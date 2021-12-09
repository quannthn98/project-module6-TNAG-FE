import {User} from './user';

export interface Notification {
  sender: User;

  receiver: User;

  content: string;

  routerLink?: string;
}
