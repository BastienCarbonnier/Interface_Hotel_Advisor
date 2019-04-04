import { TestBed } from '@angular/core/testing';

import { GuardGerantService } from './guard-gerant.service';

describe('GuardGerantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardGerantService = TestBed.get(GuardGerantService);
    expect(service).toBeTruthy();
  });
});
