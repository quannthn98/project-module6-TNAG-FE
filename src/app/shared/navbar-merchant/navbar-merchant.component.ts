import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../service/socket/socket.service';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-navbar-merchant',
  templateUrl: './navbar-merchant.component.html',
  styleUrls: ['./navbar-merchant.component.css']
})
export class NavbarMerchantComponent implements OnInit {

  constructor(private socketService: SocketService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.socketService.connectToNotify();
  }

}
