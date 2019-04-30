import { TestBed } from '@angular/core/testing';

import { CookingServiceService } from './cooking-service.service';

describe('CookingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookingServiceService = TestBed.get(CookingServiceService);
    expect(service).toBeTruthy();
  });
});
