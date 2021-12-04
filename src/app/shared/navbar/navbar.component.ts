import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../model/userToken';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: UserToken = {};
  categories: Category[] = [];
  currentUserDetail: User = {};

  constructor(private authenticationService: AuthenticationService,
              private categoryService: CategoryService,
              private userService: UserService,
              private router: Router) {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getAllCategory();
    this.getCurrentUserDetail();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categories = data.content;
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
    this.sweetalert2();
  }
  getCurrentUserDetail() {
    this.userService.getUserById(this.currentUser.id).subscribe(user => {
      this.currentUserDetail = user;
      console.log(this.currentUserDetail);
    }, error => {
      console.log(error);
    });
  }
  sweetalert2() {
    Swal.fire({
      position: 'top-end',
      width: 300,
      icon: 'success',
      toast: true,
      text: 'Đã đăng xuất',
      showConfirmButton: false,
      timer: 1000
    });
  }
}
