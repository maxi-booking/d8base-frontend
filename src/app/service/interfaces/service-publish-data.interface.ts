import {Master} from '@app/core/models/master';
import {User} from '@app/core/models/user';
import {MasterLocation} from '@app/master/models/master-location';
import {MasterSchedule} from '@app/master/models/master-schedule';
import {Price} from '@app/service/models/price';
import {Service} from '@app/service/models/service';
import {ServiceLocation} from '@app/service/models/service-location';
import {ServicePhoto} from '@app/service/models/service-photo';
import {ServiceSchedule} from '@app/service/models/service-schedule';

export default interface ServicePublishData {
    master: Master;
    service: Service;
    servicePhotos: ServicePhoto[];
    serviceSchedule: ServiceSchedule[];
    masterSchedule: MasterSchedule[];
    serviceLocation: ServiceLocation;
    masterLocation: MasterLocation;
    servicePrice: Price;
    user?: User;
}