import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {UserToken} from '../../model/userToken';
import {NgForm} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {UserProfile} from '../../model/user-profile';
import {Router} from '@angular/router';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  currentUser: UserToken = {};
  image;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router,
              private alertService: AlertService) {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  updateInformation(profile: NgForm) {
    this.userService.updateUserProfile(profile.value).subscribe((data: UserProfile) => {
      this.currentUser.name = data.fullName;
      this.currentUser.phone = data.phone;
      this.currentUser.sex = data.sex;
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      this.authenticationService.currentUserSubject.next(this.currentUser);
      this.getCurrentUser();
      this.alertService.alertSuccess('Thay đổi thông tin thành công');
    });
  }

  changeAvatar(avatar: NgForm) {
    const formData = new FormData();
    formData.append('avatar', this.image);
    this.userService.updateAvatar(formData).subscribe((data: UserProfile) => {
      this.alertService.alertSuccess('Update avatar Thành công');
      this.currentUser.avatar = data.avatar;
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      this.authenticationService.currentUserSubject.next(this.currentUser);
    });
  }

  handleFileInput(event) {
    this.image = (event.target).files[0];
  }


}
