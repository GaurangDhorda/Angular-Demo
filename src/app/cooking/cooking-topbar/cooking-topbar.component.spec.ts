import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CookingTopbarComponent } from './cooking-topbar.component';

describe('CookingTopbarComponent', () => {
  let component: CookingTopbarComponent;
  let fixture: ComponentFixture<CookingTopbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CookingTopbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookingTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
