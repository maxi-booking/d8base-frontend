import { TestBed } from '@angular/core/testing';

import { CountriesApiService } from './countries-api.service';

describe('CountriesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: CountriesApiService = TestBed.get(CountriesApiService);
    expect(service).toBeTruthy();
  });
});
