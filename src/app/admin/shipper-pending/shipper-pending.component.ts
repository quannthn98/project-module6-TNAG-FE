import {Component, OnInit} from '@angular/core';
import {ShipperRequest} from '../../model/shipper-request';
import {ShipperService} from '../../service/shipper.service';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-shipper-pending',
  templateUrl: './shipper-pending.component.html',
  styleUrls: ['./shipper-pending.component.css']
})
export class ShipperPendingComponent implements OnInit {
  request: ShipperRequest[] = [];
  targetShipper: ShipperRequest;


  constructor(private shipperService: ShipperService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getPendingRequest();
  }

  getPendingRequest() {
    this.shipperService.getPendingRequest().subscribe((data) => {
      console.log(data);
      this.request = data;
    });
  }

  getRequest(index) {
    this.targetShipper = this.request[index];
  }

  updateStatus(status: string) {
    this.shipperService.updateStatus(this.targetShipper.id, status).subscribe(data => {
      console.log(data);
      this.getPendingRequest();
      this.alertService.alertSuccess('Thay đổi thành công');
    });
  }

}
