import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Service } from '@app/api/models';
import { AccountsService } from '@app/api/services/accounts.service';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import LocationSelectorContext from './location-selector-context.interface';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
})
/**
 * Professional location selector
 */
export class LocationSelectorComponent {

  public context$: Observable<LocationSelectorContext>;
  @Output() public selectedLocationId = new EventEmitter<number>();
  private readonly service$ = new ReplaySubject<Service>(1);

  constructor(
    api: AccountsService,
  ) {
    this.context$ = this.service$.pipe(
      switchMap(service => forkJoin({
        allLocations: api.accountsProfessionalLocationsList({
          professional: service.professional.toString(),
        }),
        initialLocations: api.accountsServiceLocationsList({
          service: service.id.toString(),
        }),
      })),
      map(data => ({
        professionalLocations: data.allLocations.results,
        initialLocation: data.initialLocations.results[0],
      })),
    );
  }

  @Input()
  public set service(service: Service) {
    this.service$.next(service);
  }

  public onChange(event: CustomEvent): void {
    this.selectedLocationId.emit(event.detail.value);
  }
}