import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {StorageManagerService} from '../../core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../core/services/token-manager.service.spec';
import {ServicesGeneratorFactoryService} from './services-generator-factory.service';

describe('ServicesGeneratorFactoryService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            ServicesGeneratorFactoryService,
            {provide: StorageManagerService, useClass: StorageManagerMock}
        ]
    }));

    it('should be created', () => {
        const service: ServicesGeneratorFactoryService = TestBed.inject(ServicesGeneratorFactoryService);
        expect(service).toBeTruthy();
    });
});
