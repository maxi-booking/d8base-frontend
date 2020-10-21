import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Platform} from '@ionic/angular';
import {IonicStorageModule} from '@ionic/storage';
import {TranslateModule} from '@ngx-translate/core';
import {AppInitService} from './app-init.service';
import {TranslationService} from './translation.service';

describe('AppInitService', () => {

    let trans: TranslationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                TranslateModule.forRoot(),
                IonicStorageModule.forRoot()
            ],
            providers: [
                Platform,
                AppInitService
            ]
        });

        trans = TestBed.inject(TranslationService);

        spyOn(trans, 'init');
    });

    it('should be created', () => {
        const service: AppInitService = TestBed.inject(AppInitService);
        expect(service).toBeTruthy();
    });

    it('test translate service init', (done) => {
        const service: AppInitService = TestBed.inject(AppInitService);

        service.init().then(
            res => {
                expect((service as any).translationService.init).toHaveBeenCalled();
                done();
            }
        );
    });
});
