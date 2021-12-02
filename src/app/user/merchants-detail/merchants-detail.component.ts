import {Component, OnInit} from '@angular/core';
import {Merchant} from '../../model/merchant';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-merchants-detail',
  templateUrl: './merchants-detail.component.html',
  styleUrls: ['./merchants-detail.component.css']
})
export class MerchantsDetailComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
