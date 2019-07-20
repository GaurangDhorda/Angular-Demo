import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialContactListComponent } from './material-contact-list.component';

describe('MaterialContactListComponent', () => {
  let component: MaterialContactListComponent;
  let fixture: ComponentFixture<MaterialContactListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialContactListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
