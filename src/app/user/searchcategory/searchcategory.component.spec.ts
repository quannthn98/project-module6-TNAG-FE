import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchcategoryComponent } from './searchcategory.component';

describe('SearchcategoryComponent', () => {
  let component: SearchcategoryComponent;
  let fixture: ComponentFixture<SearchcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
