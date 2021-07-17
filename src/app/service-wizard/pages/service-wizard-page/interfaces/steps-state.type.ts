import { ServiceIds } from '../enums/service-ids.enum';

export type ServiceStepsState = {
  [K in ServiceIds]?: { [dataKey: string]: any };
};
