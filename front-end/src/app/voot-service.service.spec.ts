import { TestBed } from '@angular/core/testing';

import { VootServiceService } from './voot-service.service';

describe('VootServiceService', () => {
  let service: VootServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VootServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
