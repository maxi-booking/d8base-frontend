import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service, Subcategory } from '@app/api/models';
import { AccountsService, ProfessionalsService } from '@app/api/services';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Store } from '@ngxs/store';
import { of, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ServiceIds } from './enums/service-ids.enum';
import { ServiceWizardStateService } from './services';

@Component({
  selector: 'app-service-wizard-page',
  templateUrl: './service-wizard-page.component.html',
})
export class ServiceWizardPage {
  private readonly ngDestroy$ = new Subject<void>();

  constructor(
    private readonly wizardState: ServiceWizardStateService,
    private readonly router: Router,
    private readonly accountsService: AccountsService,
    private readonly professionalsService: ProfessionalsService,
    private readonly store: Store,
  ) {}

  public ionViewWillEnter(): void {
    this.setContext();
    this.subscribeSubmit();
  }

  public ionViewDidLeave(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
    this.wizardState.reset();
  }

  private subscribeSubmit(): void {
    this.wizardState
      .submit()
      .pipe(
        map(state => Object.values(state).reduce((acc, curr) => ({ ...acc, ...curr }), {})),
        takeUntil(this.ngDestroy$),
      )
      .subscribe((service: Service) => {
        this.createService(service);
      });
  }

  private createService(service: Service): void {
    this.accountsService.accountsServicesCreate(service).subscribe(({ id }) => {
      this.router.navigate(['/', 'service', id]);
    });
  }

  private setContext(): void {
    this.store
      .select(CurrentUserSelectors.defaultProfessional)
      .pipe(
        switchMap(defaultProfessional =>
          !defaultProfessional
            ? of(null)
            : of(defaultProfessional).pipe(
                switchMap(({ subcategory }) => this.professionalsService.professionalsSubcategoriesRead(subcategory)),
                switchMap((subcategory: Subcategory) =>
                  this.professionalsService
                    .professionalsCategoriesRead(subcategory.category)
                    .pipe(map(category => ({ category, subcategory }))),
                ),
              ),
        ),
        takeUntil(this.ngDestroy$),
      )
      .subscribe(categoryState => {
        this.wizardState.setContext({ [ServiceIds.Category]: categoryState });
      });
  }
}
