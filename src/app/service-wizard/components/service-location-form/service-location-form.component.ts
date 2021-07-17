import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalLocation, Service } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import { serviceTypes } from '@app/core/types/service-types';
import { takeUntil } from 'rxjs/operators';
import { ServiceLocationFormFields } from '../../enums/service-location.form-fields';

@Component({
  selector: 'app-service-location-form',
  templateUrl: './service-location-form.component.html',
  styleUrls: ['./service-location-form.component.scss'],
  providers: [NgDestroyService],
})
export class ServiceLocationFormComponent {
  public readonly serviceTypes = serviceTypes;
  public formFields = ServiceLocationFormFields;
  public form: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly destroy$: NgDestroyService) {}

  public createForm(): FormGroup {
    this.form = this.fb.group({
      [this.formFields.ServiceType]: [null, Validators.required],
      [this.formFields.Location]: [null, Validators.required],
      [this.formFields.MaxDistance]: [null, Validators.required],
    });
    this.updateValidityByServiceType();
    return this.form;
  }

  public selectProfessionalLocation(professionalLocation: ProfessionalLocation): void {
    this.form.controls[this.formFields.Location].setValue(professionalLocation);
  }

  public enterDistance(event: CustomEvent): void {
    this.form.controls[this.formFields.MaxDistance].setValue(event.detail.value);
  }

  private updateValidityByServiceType(): void {
    const handlingFields = [this.formFields.Location, this.formFields.MaxDistance].map(
      fieldName => this.form.controls[fieldName],
    );
    this.form.controls[this.formFields.ServiceType].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((serviceType: Service['service_type']) => {
        if (serviceType === 'online') {
          handlingFields.forEach(field => {
            field.disable();
          });
          return;
        }
        handlingFields.forEach(field => {
          field.enable();
        });
        if (serviceType === 'professional') {
          this.form.controls[this.formFields.MaxDistance].disable();
          return;
        }
      });
  }
}
