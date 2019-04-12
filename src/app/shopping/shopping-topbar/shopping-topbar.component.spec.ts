import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingTopbarComponent } from './shopping-topbar.component';

describe('ShoppingTopbarComponent', () => {
  let component: ShoppingTopbarComponent;
  let fixture: ComponentFixture<ShoppingTopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingTopbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
