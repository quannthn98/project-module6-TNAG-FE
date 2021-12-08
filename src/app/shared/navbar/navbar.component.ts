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
  carts: Cart[] = [];
  cartDetail: CartDetail[] = [];

  constructor(private authenticationService: AuthenticationService,
              private categoryService: CategoryService,
              private userService: UserService,
              private cartService: CartService,
              private router: Router) {
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
    }
  }

  ngOnInit() {
    this.getAllCategory();
    this.getCurrentUserDetail();
    this.checkRole();
    this.getCartByUser();
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
}
