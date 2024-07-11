import { TestBed } from '@angular/core/testing';

import { ShipmentCostService } from './shipment-cost.service';

describe('ShipmentCostService', () => {
  let service: ShipmentCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmentCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
