import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../../environments/environment';
import {UserToken} from '../../model/userToken';
import {AuthenticationService} from '../authentication.service';
import {Order} from '../../model/order';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  stompClient: any;
  currentUser: UserToken;
  orders: Order[] = [];

  constructor(private authenticationService: AuthenticationService) {

  }

  connectToOrders() {
    const ws = new SockJS(`${API_URL}/ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe('/topic/orders', data => {
        console.log(data);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  addNewOrder() {

  }
}
