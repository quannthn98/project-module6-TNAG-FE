import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  submitUser(createUserForm) {
    let newUser: User = createUserForm.value;
    this.userService.createUser(newUser).subscribe(() => {
      createUserForm.resetForm();
      this.router.navigateByUrl('/login');
    }, error => {
      console.log(error);
    });
  }
}
