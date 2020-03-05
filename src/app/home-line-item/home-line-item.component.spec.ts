import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLineItemComponent } from './home-line-item.component';

describe('HomeLineItemComponent', () => {
  let component: HomeLineItemComponent;
  let fixture: ComponentFixture<HomeLineItemComponent>;

  beforeEach(async(() => {
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
