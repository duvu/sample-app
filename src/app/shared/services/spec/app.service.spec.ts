import { TestBed, inject } from '@angular/core/testing';

import { ApplicationContext } from '../application-context.service';

describe('ApplicationContext', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationContext]
    });
  });

  it('should ...', inject([ApplicationContext], (service: ApplicationContext) => {
    expect(service).toBeTruthy();
  }));
});
