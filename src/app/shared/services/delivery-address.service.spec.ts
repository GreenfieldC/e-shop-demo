import { TestBed } from '@angular/core/testing';

import { DeliveryAddressService } from './delivery-address.service';

describe('DeliveryAddressService', () => {
  let service: DeliveryAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
