import { TestBed } from '@angular/core/testing';

import { TestFirebaseService } from './test-firebase.service';

describe('TestFirebaseService', () => {
  let service: TestFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
