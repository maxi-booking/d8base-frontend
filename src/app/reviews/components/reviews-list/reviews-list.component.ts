import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalList, ReviewList } from '@app/api/models';
import { AccountsService, ProfessionalsService, ServicesService } from '@app/api/services';
import { CommunicationService } from '@app/api/services/communication.service';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { NavController } from '@ionic/angular';
import { forkJoin, Observable, of } from 'rxjs';
import { filter, map, share, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss'],
})
export class ReviewsListComponent {
  public readonly professionalId$: Observable<number> = this.activatedRoute.params.pipe(
    map(({ professionalId }) => professionalId),
    filter(professionalId => Boolean(professionalId)),
  );

  public readonly professional$: Observable<ProfessionalList> = this.professionalId$.pipe(
    switchMap(professionalId => this.professionalsService.professionalsProfessionalsRead(professionalId)),
  );

  public readonly reviews$: Observable<ReviewList[]> = this.professionalId$.pipe(
    switchMap(professionalId =>
      this.communicationService.communicationReviewsList({
        professional: professionalId,
      }),
    ),
    map(({ results }) => results),
    share(),
  );

  public isAbleToReview$: Observable<boolean> = this.userManagerService.getCurrentUser().pipe(
    switchMap(user =>
      !user
        ? of(false)
        : this.professionalId$.pipe(
            switchMap(professionalId =>
              forkJoin([
                this.accountsService
                  .accountsOrdersSentList({ statusIn: 'completed' })
                  .pipe(map(({ results: orders }) => orders.map(({ service }) => service))),
                this.servicesService
                  .servicesServicesList({ professional: professionalId })
                  .pipe(map(({ results: services }) => services.map(({ id }) => id))),
              ]),
            ),
            map(([completedServices, professionalServices]) =>
              Boolean(completedServices.filter(completedService => professionalServices.includes(completedService)).length),
            ),
          ),
    ),
  );

  public reviewCountryCodes: { [nationality: number]: string };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly accountsService: AccountsService,
    private readonly communicationService: CommunicationService,
    private readonly professionalsService: ProfessionalsService,
    private readonly servicesService: ServicesService,
    private readonly userManagerService: UserManagerService,
    private readonly navCtrl: NavController,
  ) {}

  public back(): void {
    this.navCtrl.back();
  }
}
