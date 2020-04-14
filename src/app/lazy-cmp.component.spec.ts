import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyCmpComponent } from './lazy-cmp.component';

describe('LazyCmpComponent', () => {
  let component: LazyCmpComponent;
  let fixture: ComponentFixture<LazyCmpComponent>;

  beforeEach(async(() => {
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
