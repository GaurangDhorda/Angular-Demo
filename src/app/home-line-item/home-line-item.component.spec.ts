import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeLineItemComponent } from './home-line-item.component';

describe('HomeLineItemComponent', () => {
  let component: HomeLineItemComponent;
  let fixture: ComponentFixture<HomeLineItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
