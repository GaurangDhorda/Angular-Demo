import { TestBed } from '@angular/core/testing';

import { MaterialFirebaseService } from './material-firebase.service';

describe('MaterialFirebaseService', () => {
  let service: MaterialFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
