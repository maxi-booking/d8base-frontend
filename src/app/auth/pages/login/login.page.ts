import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Credentials} from '@app/auth/interfaces/credentials';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnDestroy {
    public errorMessage: string;
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly authFactory: AuthenticationFactory,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly masterManager: MasterManagerService
    ) {
        this.route.queryParams.pipe(
            filter(params => params?.hasOwnProperty('logout')),
            takeUntil(this.destroy$)
        ).subscribe(() => this.logout());
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
    }

    public onSubmitLoginForm(user: Credentials): void {
        this.authFactory.getAuthenticator().login(user).subscribe(
            _ => {
                this.masterManager.updateIsMaster();
                this.router.navigateByUrl('/profile');
            },
            (error: HttpErrorResponse) => {
                if (400 === error.status && error.error.error === 'invalid_grant') {
                    this.errorMessage = 'login-page.incorrect-login-data';
                } else {
                    console.error(error.error);
                }
            }
        );
    }

    private logout(): void {
        this.authFactory.getAuthenticator().logout().subscribe(() => {
            this.masterManager.updateIsMaster();
            this.router.navigateByUrl('/auth/login');
        });
    }
}
