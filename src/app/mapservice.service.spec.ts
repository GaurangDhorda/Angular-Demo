import { TestBed } from '@angular/core/testing';

import { MapserviceService } from './mapservice.service';

describe('MapserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapserviceService = TestBed.get(MapserviceService);
    expect(service).toBeTruthy();
  });
});
