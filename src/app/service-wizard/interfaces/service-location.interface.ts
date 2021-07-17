import { Service } from '@app/api/models';
import { ServiceLocation } from '@app/service/models/service-location';

export interface ServiceLocationInterface {
  service_type: Service['service_type'];
  location: ServiceLocation['location'];
  max_distance: ServiceLocation['max_distance'];
}
