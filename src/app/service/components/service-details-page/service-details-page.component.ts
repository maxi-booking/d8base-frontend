import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalList } from '@app/api/models';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ServicesReadonlyApiService } from '@app/core/services/services-readonly-api.service';
import { MasterReadonlyApiService } from '@app/master/services/master-readonly-api.service';
import { Service } from '@app/service/models/service';
import { first, switchMap, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-service-details-page',
    templateUrl: './service-details-page.component.html',
    styleUrls: ['./service-details-page.component.scss']
})
export class ServiceDetailsPageComponent implements OnInit {
    public service: Service;

    public master: ProfessionalList;
    public orderRouterLink: string;
    public orderRouterQueryParams: any;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly servicesApi: ServicesReadonlyApiService,
        private readonly masterApi: MasterReadonlyApiService,
        private readonly authenticationService: AuthenticationService
    ) {}

    public ngOnInit(): void {
        this.subscribeRouteParams();
    }

    private subscribeRouteParams(): void {
        this.route.params
            .pipe(
                first(params => Boolean(params?.id)),
                switchMap(params => this.servicesApi.getByEntityId(params.id)),
                withLatestFrom(this.authenticationService.isAuthenticated$),
                switchMap(([service, isAuthenticated]) => {
                    this.service = service;
                    const orderLink = `/order/${service.id}`;
                    if (isAuthenticated) {
                        this.orderRouterLink = orderLink;
                        this.orderRouterQueryParams = null;
                    } else {
                        this.orderRouterLink = `/auth/login`;
                        this.orderRouterQueryParams = { redirectTo: orderLink };
                    }

                    return this.masterApi.getByEntityId(service.professional);
                })
            )
            .subscribe(master => (this.master = master));
    }
}
