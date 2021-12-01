import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPendingComponent } from './merchant-pending.component';

describe('MerchantPendingComponent', () => {
  let component: MerchantPendingComponent;
  let fixture: ComponentFixture<MerchantPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
