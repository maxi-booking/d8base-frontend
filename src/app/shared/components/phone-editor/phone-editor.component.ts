import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Country } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { NgDestroyService } from '@app/core/services';
import { map, takeUntil } from 'rxjs/operators';

const PAGE_SIZE = 250;
const DEFAULT_COUNTRY: Partial<Country> = { id: 6251999, name: 'Canada', tld: 'ca', phone: '+1' };
@Component({
  selector: 'app-phone-editor',
  templateUrl: './phone-editor.component.html',
  styleUrls: ['./phone-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneEditorComponent),
      multi: true,
    },
    NgDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneEditorComponent implements ControlValueAccessor {
  public phoneControl = new FormControl();
  public countryControl = new FormControl(DEFAULT_COUNTRY);
  public previousPhoneValue: string = '';
  public countries$ = this.locationApi.locationCountriesList({ pageSize: PAGE_SIZE }).pipe(map(x => x.results));
  public title = 'location-edit-page.country';
  private onChange: (value: string) => void;

  constructor(
    private readonly locationApi: LocationService,
    private readonly ngDestroy$: NgDestroyService,
    private readonly cd: ChangeDetectorRef,
  ) {
    this.subscribePhoneCodeControlValueChanges();
    this.subscribeCountryCodeControlValueChanges();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    // do nothing
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.countryControl.disable();
      this.phoneControl.disable();
    } else {
      this.countryControl.enable();
      this.phoneControl.enable();
    }
  }

  public writeValue(value: string): void {
    // do nothing
  }

  public plusSignEnforce(countryPhone: Country['phone']): string {
    return !countryPhone?.length || countryPhone?.includes('+') ? countryPhone : `+${countryPhone}`;
  }

  private subscribeCountryCodeControlValueChanges(): void {
    this.countryControl.valueChanges.pipe(takeUntil(this.ngDestroy$)).subscribe(() => {
      this.cd.markForCheck();
    });
  }

  private subscribePhoneCodeControlValueChanges(): void {
    this.phoneControl.valueChanges.pipe(takeUntil(this.ngDestroy$)).subscribe(phone => {
      const countryCode = this.plusSignEnforce(this.countryControl.value.phone);
      this.onChange(`${countryCode}${phone}`);
      this.cd.markForCheck();
    });
  }
}
