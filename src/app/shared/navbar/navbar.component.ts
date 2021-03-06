import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../model/userToken';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {CartDetail} from '../../model/cart-detail';
import {CartService} from '../../service/cart.service';
import {Cart} from '../../model/cart';
import {SocketService} from '../../service/socket/socket.service';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: UserToken = {};
  categories: Category[] = [];
  currentUserDetail: User = {};
  roles: any = [];
  isAdmin = false;
  isMerchant = false;
  isUser = false;
  isShipper = false;
  carts: Cart[] = [];
  cartDetail: CartDetail[] = [];
  selectedCategoryId: number;

  constructor(private authenticationService: AuthenticationService,
              private categoryService: CategoryService,
              private userService: UserService,
              private router: Router,
              private socketService: SocketService,
              private cartService: CartService,
              private notificationService: NotificationService) {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.roles = this.currentUser.roles;
    });
  }

  checkRole() {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].authority === 'ROLE_MERCHANT') {
        this.isMerchant = true;
      }
      if (this.roles[i].authority === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
      if (this.roles[i].authority === 'ROLE_USER') {
        this.isUser = true;
      }
      if (this.roles[i].authority === 'ROLE_SHIPPER') {
        this.isShipper = true;
      }
    }
  }

  ngOnInit() {
    this.getAllCategory();
    this.checkRole();
    if (this.isUser || this.isMerchant) {
      this.getCartByUser();
    }
    this.socketService.connectToNotify();
    this.getNotification();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categories = data.content;
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  getCurrentUserDetail() {
    this.userService.getUserById(this.currentUser.id).subscribe(user => {
      this.currentUserDetail = user;
    }, error => {
      console.log(error);
    });
  }

  getCartByUser() {
    this.cartService.getCartByUser().subscribe((data: any) => {
      this.carts = data;
      for (let i = 0; i < this.carts.length; i++) {
        this.cartDetail = this.carts[i].cartDetails;
        let totalPayment = 0;
        for (let j = 0; j < this.cartDetail.length; j++) {
          totalPayment += (this.cartDetail[j].price * this.cartDetail[j].quantity);
        }
        this.carts[i].totalPayment = totalPayment;
      }
    });
  }

  getNotification() {
    this.notificationService.getAllNotificationByUser(this.currentUser.id).subscribe(data => {
      this.socketService.notifications = data;
    });
  }

  getSelectedCategory(id: number) {
    this.userService.selectedCategoryId = id;
  }

  resetUnreadMessage() {
    this.socketService.unreadMessage = 0;
  }
}
