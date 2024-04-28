import { TestBed } from '@angular/core/testing';

import { CargaSinEstresDataService } from './carga-sin-estres-data.service';

describe('CargaSinEstresDataService', () => {
  let service: CargaSinEstresDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaSinEstresDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
