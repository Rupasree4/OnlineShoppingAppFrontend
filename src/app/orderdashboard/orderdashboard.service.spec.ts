import { TestBed } from '@angular/core/testing';

import { OrderdashboardService } from './orderdashboard.service';

describe('OrderdashboardService', () => {
  let service: OrderdashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderdashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
