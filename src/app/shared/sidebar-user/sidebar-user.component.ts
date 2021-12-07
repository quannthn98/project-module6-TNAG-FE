import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {UserToken} from '../../model/userToken';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent implements OnInit {
  currentUser: UserToken = {};

  constructor(private authenticationService: AuthenticationService) {
    this.currentUser = authenticationService.currentUserValue;
  }

  ngOnInit() {

  }

}
