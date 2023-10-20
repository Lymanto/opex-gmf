import { TestBed } from '@angular/core/testing';

import { GetSpecificUserService } from './get-specific-user.service';

describe('GetSpecificUserService', () => {
  let service: GetSpecificUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSpecificUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
