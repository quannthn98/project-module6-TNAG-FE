import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../service/order.service';
import {Order} from '../../model/order';
import {LocationService} from '../../service/location.service';
import {SocketService} from '../../service/socket/socket.service';
import {Message} from '../../model/message';
import {AuthenticationService} from '../../service/authentication.service';


@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit, OnChanges {
  orderId: number;
  order: Order;
  merchantLocation: any;
  userLocation: any;
  distance: any;
  message: string;
  newMessage: Message;
  currentUser;

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private locationService: LocationService,
              private socketService: SocketService,
              private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.activatedRoute.paramMap.subscribe(paraMap => {
      this.orderId = +paraMap.get('id');
      this.getOrderById();
      this.scrollChatToBottom();
    });
  }


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getOrderById() {
    this.orderService.getOrderById(this.orderId).subscribe(async data => {
      this.order = data;
      const location = await this.getUserGeoToPromise();
      this.userLocation = {
        lat: location.results[0].geometry.lat,
        lng: location.results[0].geometry.lng
      };
      const merchantLocation = await this.getMerchantGeoToPromise();
      this.merchantLocation = {
        lat: merchantLocation.results[0].geometry.lat,
        lng: merchantLocation.results[0].geometry.lng
      };
      this.distance = this.locationService.calculateDistance(this.userLocation, this.merchantLocation);
      if (this.currentUser.id === this.order.user.id) {
        await this.socketService.connectToChat(this.order.shipper.id);
      } else {
        await this.socketService.connectToChat(this.order.user.id);
      }
    });
  }

  getUserGeoToPromise(): any {
    return this.locationService.forwardConvert(this.order.address.address).toPromise();
  }

  getMerchantGeoToPromise(): any {
    return this.locationService.forwardConvert(this.order.merchant.merchantProfile.address).toPromise();
  }

  sendMessage() {
    if (this.order.shipper.id === this.currentUser.id) {
      this.newMessage = {
        sender: {
          id: this.currentUser.id
        },
        receiver: {
          id: this.order.user.id
        },
        content: this.message
      };
    } else {
      this.newMessage = {
        sender: {
          id: this.currentUser.id
        },
        receiver: {
          id: this.order.shipper.id
        },
        content: this.message
      };
    }
    console.log(this.message);
    console.log(this.newMessage);
    this.socketService.sendMessage(this.newMessage);
    this.scrollChatToBottom();
  }

  scrollChatToBottom() {
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
  }

  showChatBox() {
    document.getElementById('chatbox').style.display = 'block';
  }

}
