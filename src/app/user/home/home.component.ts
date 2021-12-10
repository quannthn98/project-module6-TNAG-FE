import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  merchants: User[] = [];

  constructor(private userService: UserService,
              private router: Router) {
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

  searchMerchantByName() {
    this.userService.findAllMerchantByName(this.userService.searchValue).subscribe((data: any) => {
      this.userService.searchedMerchant = data.content;
      this.router.navigateByUrl('/searchCategory');
    });
  }
}
