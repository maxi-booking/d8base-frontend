import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LocationInterface } from '@app/auth/interfaces/location/location.interface';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Observable } from 'rxjs';
import { IpApiService } from './ip-api.service';
import { IpDataService } from './ip-data.service';
import { IpServicesHolderService } from './ip-services-holder.service';
import { IpnfDataService } from './ipnf-data.service';
import { LocationService } from './location.service';

class HttpMock {
    public get(url: string): Observable<any> {
        if (url === 'https://ipapi.co/json/') {
            return new Observable<any>(
                subscriber => {
                    const data = {
                        error: true,
                    };
                    subscriber.next(data);
                    subscriber.complete();
                },
            );
        }

        return new Observable<any>(
            subscriber => {
                const data: any = {
                    postal: 'testPostal',
                    country_code: 'testCode',
                    latitude: 123,
                    longitude: 321,
                    time_zone: { name: 'timezone'},
                    city: 'test',
                    region_code: 'code',
                };
                subscriber.next(data);
                subscriber.complete();
            },
        );
    }
}

describe('LocationService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            LocationService,
            IpServicesHolderService,
            IpApiService,
            IpDataService,
            IpnfDataService,
            { provide: HttpClient, useClass: HttpMock},
            { provide: Geolocation, useValue: { getCurrentPosition: () => 'test' }},
            { provide: LocationAccuracy, useValue: { canRequest: () => true, REQUEST_PRIORITY_HIGH_ACCURACY: 'test'}},
        ],
    }));

    it('should be created', () => {
        const service: LocationService = TestBed.inject(LocationService);
        expect(service).toBeTruthy();
    });
    it('should be do some work', (done) => {
        const service: LocationService = TestBed.inject(LocationService);

        service.getIpLocationData().subscribe(
            (returnData: LocationInterface) => {
                expect(returnData.postalCode).toBe('testPostal');
                expect(returnData.countryCode).toBe('testCode');
                expect(returnData.latitude).toBe(123);
                expect(returnData.longitude).toBe(321);
                expect(returnData.timezone).toBe('timezone');
                expect(returnData.city).toBe('test');
                expect(returnData.regionCode).toBe('code');
                done();
            },
        );
    });
});
