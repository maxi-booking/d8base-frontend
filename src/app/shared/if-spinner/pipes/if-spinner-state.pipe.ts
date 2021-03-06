import { Pipe, PipeTransform } from '@angular/core';
import { convertToIfSpinnerState } from '@app/shared/if-spinner/utils/if-spinner.functions';
import { Observable } from 'rxjs';
import { IfSpinnerState } from '../models/if-spinner.model';

@Pipe({
  name: 'ifSpinnerErrorState',
})
export class IfSpinnerErrorStatePipe implements PipeTransform {
  public transform<T>(value: Observable<T>): Observable<IfSpinnerState<T>> {
    return value.pipe(convertToIfSpinnerState<T>());
  }
}
