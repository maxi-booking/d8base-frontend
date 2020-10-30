import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServicePublishStepTwoFormFields} from '@app/service/enums/service-publish-step-two-form-fields';
import {StepTwoDataInterface} from '@app/service/interfaces/step-two-data-interface';

@Injectable()
export class ServicePublishStepTwoFormService {

    public form: FormGroup;

    constructor(private readonly formBuilder: FormBuilder) {
    }

    public createForm(data?: StepTwoDataInterface): void {
        this.form = this.formBuilder.group({
                [ServicePublishStepTwoFormFields.Name]: [data?.name, Validators.required],
                [ServicePublishStepTwoFormFields.Description]: [data?.description, Validators.minLength(20)],
                [ServicePublishStepTwoFormFields.Duration]: [data?.duration, Validators.required],
                [ServicePublishStepTwoFormFields.IsPriceFixed]: [data?.is_price_fixed ?? true],
                [ServicePublishStepTwoFormFields.FixedPrice]: [data?.price],
                [ServicePublishStepTwoFormFields.StartPrice]: [data?.start_price],
                [ServicePublishStepTwoFormFields.EndPrice]: [data?.end_price],
                [ServicePublishStepTwoFormFields.Location]: [data?.service_type, Validators.required],
                [ServicePublishStepTwoFormFields.Currency]: [data?.price_currency],
                [ServicePublishStepTwoFormFields.StartPriceCurrency]: [data?.start_price_currency],
                [ServicePublishStepTwoFormFields.EndPriceCurrency]: [data?.end_price_currency]
            },
            {validators: [this.checkPricesValidator, this.fixedPriceValidator, this.currencyValidator]}
        );
    }

    public isSubmitDisabled(): boolean {
        return this.form.invalid;
    }

    private currencyValidator(group: FormGroup): any {
        if (group.get(ServicePublishStepTwoFormFields.IsPriceFixed).value &&
            !group.get(ServicePublishStepTwoFormFields.Currency).value) {
            group.get(ServicePublishStepTwoFormFields.Currency).setErrors({fixedPriceCurrencyError: true});
        }
        if (!group.get(ServicePublishStepTwoFormFields.IsPriceFixed).value &&
            !group.get(ServicePublishStepTwoFormFields.StartPriceCurrency).value) {
            group.get(ServicePublishStepTwoFormFields.StartPriceCurrency).setErrors({startPriceCurrencyError: true});
        }
        if (!group.get(ServicePublishStepTwoFormFields.IsPriceFixed).value &&
            !group.get(ServicePublishStepTwoFormFields.EndPriceCurrency).value) {
            group.get(ServicePublishStepTwoFormFields.EndPriceCurrency).setErrors({endPriceCurrencyError: true});
        }
    }

    private fixedPriceValidator(group: FormGroup): any {
        if (group.get(ServicePublishStepTwoFormFields.IsPriceFixed).value &&
            !group.get(ServicePublishStepTwoFormFields.FixedPrice).value) {
            group.get(ServicePublishStepTwoFormFields.FixedPrice).setErrors({priceError: true});
        }
        if (!group.get(ServicePublishStepTwoFormFields.IsPriceFixed).value &&
            !group.get(ServicePublishStepTwoFormFields.StartPrice).value) {
            group.get(ServicePublishStepTwoFormFields.StartPrice).setErrors({priceError: true});
        }
        if (!group.get(ServicePublishStepTwoFormFields.IsPriceFixed).value &&
            !group.get(ServicePublishStepTwoFormFields.EndPrice).value) {
            group.get(ServicePublishStepTwoFormFields.EndPrice).setErrors({priceError: true});
        }
    }

    private checkPricesValidator(group: FormGroup): any {
        const startPrice = parseInt(group.get(ServicePublishStepTwoFormFields.StartPrice).value, 10);
        const endPrice = parseInt(group.get(ServicePublishStepTwoFormFields.EndPrice).value, 10);
        if (startPrice > endPrice) {
            group.get(ServicePublishStepTwoFormFields.EndPrice).setErrors({priceError: true});
        } else {
            return null;
        }
    }
}
