import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../model/userToken';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currenUser: UserToken = {};

  constructor(private authentication: AuthenticationService) {
    this.authentication.currentUser.subscribe(data => {
      this.currenUser = data;
    });
  }

  ngOnInit() {
  }

}
