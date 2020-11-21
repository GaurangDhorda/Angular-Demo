import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LazyCmpComponent } from './lazy-cmp.component';

describe('LazyCmpComponent', () => {
  let component: LazyCmpComponent;
  let fixture: ComponentFixture<LazyCmpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
