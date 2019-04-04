import { TestBed } from '@angular/core/testing';

import { GuardEmetteurService } from './guard-emetteur.service';

describe('GuardEmetteurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardEmetteurService = TestBed.get(GuardEmetteurService);
    expect(service).toBeTruthy();
  });
});
