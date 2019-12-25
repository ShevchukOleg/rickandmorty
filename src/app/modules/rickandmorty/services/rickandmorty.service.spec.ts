import { TestBed } from '@angular/core/testing';

import { RickandmortyService } from './rickandmorty.service';

describe('RickandmortyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RickandmortyService = TestBed.get(RickandmortyService);
    expect(service).toBeTruthy();
  });
});
