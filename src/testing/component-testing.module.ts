import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IpApiService } from '@app/core/services/location/ip-api.service';
import { IpDataService } from '@app/core/services/location/ip-data.service';
import { IpServicesHolderService } from '@app/core/services/location/ip-services-holder.service';
import { IpnfDataService } from '@app/core/services/location/ipnf-data.service';
import { SharedModule } from '@app/shared/shared.module';
import { StoreModule } from '@app/store/store.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';
import { StorageManagerMock } from './mocks';

export const ROOT_MODULES = [
  IonicModule.forRoot(),
  TranslateModule.forRoot(),
  StoreModule.forRoot(),
];

@NgModule({
  imports: [
    HttpClientTestingModule,
    RouterTestingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    // mocks:
    { provide: Storage, useClass: StorageManagerMock },

    // Location service deps:
    IpServicesHolderService,
    IpApiService,
    IpDataService,
    IpnfDataService,
    Geolocation,
    LocationAccuracy,
  ],
})
export class ComponentTestingModule {
}