import { TestBed } from '@angular/core/testing';

import { UserManagerService } from './user-manager.service';

describe('UserManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: UserManagerService = TestBed.get(UserManagerService);
    expect(service).toBeTruthy();
  });
});
