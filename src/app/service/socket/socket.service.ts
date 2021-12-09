import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../../environments/environment';
import {UserToken} from '../../model/userToken';
import {AuthenticationService} from '../authentication.service';
import {Order} from '../../model/order';
import {Notification} from '../../model/notification';
import {NotificationService} from '../notification.service';
import {OrderService} from '../order.service';
import {AlertService} from '../alert.service';
import {Message} from '../../model/message';
import {MessageService} from '../message.service';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  stompClient: any;
  currentUser: UserToken;
  messages: Message[] = [];
  newMessage: Message;
  orders: Order[] = [];
  notifications: Notification[] = [];
  notification: Notification;

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private orderService: OrderService,
              private messageService: MessageService,
              private alertService: AlertService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  connectToOrders() {
    const ws = new SockJS(`${API_URL}/ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe('/topic/orders', data => {
        console.log(data.body);
        this.orders.push(JSON.parse(data.body));
      });
    });
  }

  connectToNotify() {
    const ws = new SockJS(`${API_URL}/ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe('/topic/notify', data => {
        this.notificationService.getAllNotificationByUser(this.currentUser.id).subscribe(notifications => {
          this.notifications = notifications;
        });
        this.notification = JSON.parse(data.body);
        if (this.notification.receiver.id === this.currentUser.id) {
          this.alertService.alertSuccess('Bạn có 1 đơn hàng mới');
          this.notifications.push(JSON.parse(data.body));
        }
        console.log(JSON.parse(data.body));
      });
    });
  }

  connectToChat(senderId?: number) {
    const ws = new SockJS(`${API_URL}/ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      this.messageService.getMessages(senderId).subscribe((messages: any) => {
        console.log(messages);
        this.messages = messages;
      });
      this.stompClient.subscribe('/topic/message', data => {
        this.newMessage = JSON.parse(data.body);
        if (this.currentUser.id === this.newMessage.receiver.id || this.newMessage.sender.id === this.currentUser.id) {
          this.messages.push(this.newMessage);
        }
      });
    });
  }


  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  sendNotification(notification: Notification) {
    this.stompClient.send('/app/notify', {}, JSON.stringify(notification));
  }

  sendMessage(message: Message) {
    this.stompClient.send('/app/message', {}, JSON.stringify(message));
  }
}
