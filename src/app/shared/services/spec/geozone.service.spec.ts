import { TestBed, inject } from '@angular/core/testing';

import { GeozoneService } from '../geozone.service';

describe('GeozoneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeozoneService]
    });
  });

  it('should be created', inject([GeozoneService], (service: GeozoneService) => {
    expect(service).toBeTruthy();
  }));
});
