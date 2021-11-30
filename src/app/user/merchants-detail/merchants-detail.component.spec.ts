import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsDetailComponent } from './merchants-detail.component';

describe('MerchantsDetailComponent', () => {
  let component: MerchantsDetailComponent;
  let fixture: ComponentFixture<MerchantsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
