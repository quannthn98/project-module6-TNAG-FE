import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-status-update',
  templateUrl: './status-update.component.html',
  styleUrls: ['./status-update.component.css']
})
export class StatusUpdateComponent implements OnInit {
  currentStatus: string;
  id: number;
  updateStatusForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    status: new FormControl()
  });

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getMerchantStatus(this.id);
    });
  }

  ngOnInit() {
  }

  getMerchantStatus(id: number) {
    this.userService.getMerchantById(id).subscribe(merchant => {
      this.updateStatusForm = new FormGroup({
        id: new FormControl(merchant.id),
        name: new FormControl(merchant.name),
        address: new FormControl(merchant.address),
        hotline: new FormControl(merchant.hotline),
        openHours: new FormControl(merchant.openHours),
      });
    });
  }
}
