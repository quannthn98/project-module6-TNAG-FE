import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {MerchantProfile} from '../../model/merchant-profile';
import {User} from '../../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  merchants: User[] = [];

  constructor(private userService: UserService) {
    this.getAllMerchant();
  }

  ngOnInit() {
  }

  getAllMerchant() {
    this.userService.getAllMerchant().subscribe((data: any) => {
      this.merchants = data.content;
      console.log(this.merchants);
    }, error => {
      console.log(error);
    });
  }
}
