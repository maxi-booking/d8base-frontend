import {TestBed} from '@angular/core/testing';

import {MasterPhotosGeneratorFactoryService} from './master-photos-generator-factory.service';

describe('MasterPhotosGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterPhotosGeneratorFactoryService = TestBed.get(MasterPhotosGeneratorFactoryService);
    expect(service).toBeTruthy();
  });
});