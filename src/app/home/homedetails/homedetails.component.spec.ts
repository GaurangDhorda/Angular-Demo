import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomedetailsComponent } from './homedetails.component';

describe('HomedetailsComponent', () => {
  let component: HomedetailsComponent;
  let fixture: ComponentFixture<HomedetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
