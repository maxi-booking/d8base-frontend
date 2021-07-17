import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslationService } from '@app/core/services';
import { ServiceLocationInterface } from '@app/service-wizard/interfaces/service-location.interface';
import { startWith, takeUntil } from 'rxjs/operators';
import { ServiceLocationFormComponent } from '../../../../components/service-location-form/service-location-form.component';
import { ServiceStepContext } from '../../interfaces/step-context.interface';
import { ServiceStepComponent } from '../step/step';

@Component({
  selector: 'app-service-location-step',
  templateUrl: './service-location-step.component.html',
  styleUrls: ['./service-location-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ServiceStepComponent,
      useExisting: forwardRef(() => ServiceLocationStepComponent),
    },
  ],
})
export class ServiceLocationStepComponent extends ServiceStepComponent<ServiceLocationInterface> implements OnInit {
  public form: FormGroup;
  @ViewChild(ServiceLocationFormComponent, { static: true })
  private readonly formComponent: ServiceLocationFormComponent;

  constructor(public readonly trans: TranslationService, protected readonly cd: ChangeDetectorRef) {
    super(cd);
  }

  public ngOnInit(): void {
    this.initForm();
    this.subscribeFormStatus();
  }

  protected onStateChanged(data: ServiceLocationInterface): void {
    if (!data) {
      return;
    }

    this.form.patchValue(data);
  }

  protected onContextChanged(context: ServiceStepContext): void {
    super.onContextChanged(context);
  }

  private subscribeFormStatus(): void {
    this.form.statusChanges.pipe(startWith(this.form.status), takeUntil(this.ngDestroy$)).subscribe(() => {
      this.outputData = this.form.valid ? this.getStepState() : null;
      this.isValid$.next(this.form.valid);
    });
  }

  private initForm(): void {
    this.form = this.formComponent.createForm();
  }

  private getStepState(): ServiceLocationInterface {
    return this.form.value;
  }
}
