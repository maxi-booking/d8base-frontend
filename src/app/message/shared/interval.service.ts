import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class IntervalService {
  public ticks(period: number): Observable<void> {
    return interval(period).pipe(mapTo(void 0));
  }
}
