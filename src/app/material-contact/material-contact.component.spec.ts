import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialContactComponent } from './material-contact.component';

describe('MaterialContactComponent', () => {
  let component: MaterialContactComponent;
  let fixture: ComponentFixture<MaterialContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
