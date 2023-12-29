import { TestBed } from '@angular/core/testing';

import { CurrencyApiServiceService } from './currency-api-service.service';

describe('CurrencyApiServiceService', () => {
  let service: CurrencyApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
