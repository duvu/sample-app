import { TestBed, inject } from '@angular/core/testing';

import { DeviceReportService } from '../device-report.service';

describe('DeviceReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceReportService]
    });
  });

  it('should be created', inject([DeviceReportService], (service: DeviceReportService) => {
    expect(service).toBeTruthy();
  }));
});
