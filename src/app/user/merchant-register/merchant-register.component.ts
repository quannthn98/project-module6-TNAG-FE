import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-merchant-register',
  templateUrl: './merchant-register.component.html',
  styleUrls: ['./merchant-register.component.css']
})
export class MerchantRegisterComponent implements OnInit {
  id: number;
  open: number;
  close: number;

  merchantForm = new FormGroup({
    name: new FormControl(),
    address: new FormControl(),
    hotline: new FormControl(),
    openHours: new FormControl(),
    description: new FormControl()
  });

  constructor(private userService: UserService,
              private router: Router) {
    this.id = JSON.parse(localStorage.user).id;
    if (this.id == null) {
      this.router.navigateByUrl('login');
    }
  }

  ngOnInit() {

  }

  submit() {
    this.userService.registerMerchant(this.id, this.merchantForm.value).subscribe((data: any) => {
      alert('register success');
    });
  }
}
