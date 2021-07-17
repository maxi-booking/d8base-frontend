import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { ServiceList, ServiceLocationInline } from '@app/api/models';
import { ServiceStepsState } from '../../interfaces/steps-state.type';
import { ServiceStepComponent } from '../step/step';

@Component({
  selector: 'app-service-summary-step',
  templateUrl: './service-summary-step.component.html',
  styleUrls: ['./service-summary-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ServiceStepComponent,
      useExisting: forwardRef(() => ServiceSummaryStepComponent),
    },
  ],
})
export class ServiceSummaryStepComponent extends ServiceStepComponent<any> implements OnInit {
  public state: ServiceStepsState;
  public service: ServiceList;

  public ngOnInit(): void {
    this.isValid$.next(true);
  }

  public constructServiceFromStepsState(state: ServiceStepsState): void {
    this.service = null;
    const { location, max_distance, service_type } = state.location;
    const { duration, name, price } = state.info;
    const { description } = state.details;
    const serviceLocation: ServiceLocationInline = {
      id: location?.id,
      max_distance,
      location: {
        country: location?.country as number,
        city: location?.city as number,
        address: location?.address,
      },
    };
    this.service = {
      name,
      duration,
      service_type,
      description,
      price,
      locations: [serviceLocation],
      professional: 1,
    };
  }

  protected onStateChanged(data: any): void {
    this.state = data;
    this.constructServiceFromStepsState(data);
    return;
  }
}
