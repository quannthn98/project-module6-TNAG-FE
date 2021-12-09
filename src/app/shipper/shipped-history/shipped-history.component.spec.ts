import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippedHistoryComponent } from './shipped-history.component';

describe('ShippedHistoryComponent', () => {
  let component: ShippedHistoryComponent;
  let fixture: ComponentFixture<ShippedHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippedHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
