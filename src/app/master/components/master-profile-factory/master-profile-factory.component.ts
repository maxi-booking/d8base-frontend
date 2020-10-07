import {Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {MasterProfileCalendarComponent} from '@app/master/components/master-profile-calendar/master-profile-calendar.component';
import {MasterProfileInfoComponent} from '@app/master/components/master-profile-info/master-profile-info.component';
import {MasterProfilePortfolioComponent} from '@app/master/components/master-profile-portfolio/master-profile-portfolio.component';
import {MasterProfileServicesComponent} from '@app/master/components/master-profile-services/master-profile-services.component';
import {MasterProfileSubmenu} from '@app/master/enums/master-profile-submenu';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-master-profile-factory',
    templateUrl: './master-profile-factory.component.html',
    styleUrls: ['./master-profile-factory.component.scss'],
})
export class MasterProfileFactoryComponent implements OnInit, OnDestroy {

    @Input() public mode: Observable<string>;
    private sub: Subscription;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
    }

    public ngOnInit(): void {
        this.subscribeToMode();
    }

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private subscribeToMode(): void {
        this.sub = this.mode.subscribe(mode => this.createComponent(mode));
    }

    private createComponent(component: string): void {
        this.viewContainerRef.clear();
        switch (component) {
            case MasterProfileSubmenu.Services:
                const serviceComponentFactory =
                    this.componentFactoryResolver.resolveComponentFactory<MasterProfileServicesComponent>(MasterProfileServicesComponent);
                this.viewContainerRef.createComponent<MasterProfileServicesComponent>(serviceComponentFactory);
                break;
            case MasterProfileSubmenu.Info:
                const infoComponentFactory =
                    this.componentFactoryResolver.resolveComponentFactory<MasterProfileInfoComponent>(MasterProfileInfoComponent);
                const c = this.viewContainerRef.createComponent<MasterProfileInfoComponent>(infoComponentFactory);
                c.instance.init();
                break;
            case MasterProfileSubmenu.Calendar:
                const calendarComponentFactory =
                    this.componentFactoryResolver.resolveComponentFactory<MasterProfileCalendarComponent>(MasterProfileCalendarComponent);
                this.viewContainerRef.createComponent<MasterProfileCalendarComponent>(calendarComponentFactory);
                break;
            case MasterProfileSubmenu.Portfolio:
                const portfolioComponentFactory =
                    this.componentFactoryResolver.resolveComponentFactory<MasterProfilePortfolioComponent>(MasterProfilePortfolioComponent);
                this.viewContainerRef.createComponent<MasterProfilePortfolioComponent>(portfolioComponentFactory);
                break;
            default:
                throw Error('unexpected component name');
        }
    }
}