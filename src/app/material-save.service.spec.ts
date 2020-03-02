import { TestBed } from '@angular/core/testing';

import { MaterialSaveService } from './material-save.service';

describe('MaterialSaveService', () => {
  let service: MaterialSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
