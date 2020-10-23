import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {StorageManagerMock} from '../../../core/services/token-manager.service.spec';
import {ServicePublishDataHolderService} from '../service-publish-data-holder.service';
import {StepFourHandlerService} from './step-four-handler.service';

describe('StepFourHandlerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            StepFourHandlerService,
            ServicePublishDataHolderService,
            AuthenticationService,
            {provide: StorageManagerService, useClass: StorageManagerMock}
        ]
    }));

    it('should be created', () => {
        const service: StepFourHandlerService = TestBed.inject(StepFourHandlerService);
        expect(service).toBeTruthy();
    });
});
