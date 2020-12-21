import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ServicesReadonlyApiService } from '@app/core/services/services-readonly-api.service';
import { MasterReadonlyApiService } from '@app/master/services/master-readonly-api.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, of } from 'rxjs';
import { ApiClientServiceMock, StorageManagerMock } from 'src/testing/mocks';

import { ServiceDetailsPageComponent } from './service-details-page.component';

describe('ServiceDetailsPageComponent', () => {
    let component: ServiceDetailsPageComponent;
    let fixture: ComponentFixture<ServiceDetailsPageComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ServiceDetailsPageComponent],
                imports: [IonicModule.forRoot(), TranslateModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
                providers: [
                    {
                        provide: ActivatedRoute,
                        useValue: {
                            params: new BehaviorSubject({})
                        }
                    },
                    { provide: StorageManagerService, useClass: StorageManagerMock },
                    { provide: ServicesReadonlyApiService, useClass: ApiClientServiceMock },
                    { provide: MasterReadonlyApiService, useClass: ApiClientServiceMock },
                    AuthenticationService
                ]
            }).compileComponents();

            fixture = TestBed.createComponent(ServiceDetailsPageComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        })
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
