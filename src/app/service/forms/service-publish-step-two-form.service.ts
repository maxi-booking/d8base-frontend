import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Price } from '@app/api/models';
import { minimumDescriptionLength } from '@app/core/constants/service.constants';
import { ServicePublishStepTwoFormFields } from '@app/service/enums/service-publish-step-two-form-fields';
import { StepTwoDataInterface } from '@app/service/interfaces/step-two-data-interface';

@Injectable()
export class ServicePublishStepTwoFormService {
  public form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  public createForm(data?: StepTwoDataInterface): void {
    this.form = this.formBuilder.group({
      [ServicePublishStepTwoFormFields.Name]: [data?.name, Validators.required],
      [ServicePublishStepTwoFormFields.Description]: [data?.description, Validators.minLength(minimumDescriptionLength)],
      [ServicePublishStepTwoFormFields.Duration]: [data?.duration, Validators.required],
      [ServicePublishStepTwoFormFields.Price]: [data?.price, this.checkPricesValidator],
      [ServicePublishStepTwoFormFields.Location]: [data?.service_type, Validators.required],
    });
  }

  public isSubmitDisabled(): boolean {
    return this.form.invalid;
  }

  private checkPricesValidator(control: AbstractControl): ValidationErrors | null {
    const startPrice = control?.value?.start_price;
    const endPrice = control?.value?.end_price;
    if (startPrice > endPrice) {
      return { priceError: true };
    }

    return null;
  }
}
