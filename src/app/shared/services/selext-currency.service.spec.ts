import { TestBed } from '@angular/core/testing';

import { SelextCurrencyService } from './selext-currency.service';

describe('SelextCurrencyService', () => {
  let service: SelextCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelextCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
