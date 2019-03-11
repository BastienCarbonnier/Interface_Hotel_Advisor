import { TestBed } from '@angular/core/testing';

import { OntologieService } from './ontologie.service';

describe('OntologieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OntologieService = TestBed.get(OntologieService);
    expect(service).toBeTruthy();
  });
});
