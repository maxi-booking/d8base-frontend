import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ErrorFlashbagComponent} from '../../../shared/components/error-flashbag/error-flashbag.component';
import {LoginFormFields} from '../../enums/login-form-fields';
import {LoginFormService} from '../../forms/login-form.service';
import {Credentials} from '../../interfaces/credentials';
import {LoginFormComponent} from './login-form.component';

describe('LoginFormComponent', () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginFormComponent, ErrorFlashbagComponent],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                LoginFormService,
                TranslateService
            ]
        }).compileComponents();

        router = TestBed.get(Router);
        spyOn(router, 'navigateByUrl');

        fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect((component as any).loginFormService.form.valid).toBeFalsy();
    });

    it('test submit login form', () => {
        const username = (component as any).loginFormService.form.controls[LoginFormFields.Username];
        const password = (component as any).loginFormService.form.controls[LoginFormFields.Password];
        password.setValue('valid_pass');
        username.setValue('valid');

        spyOn((component as any).user, 'emit');

        fixture.debugElement.nativeElement.querySelector('ion-button').click();

        const newUser: Credentials = {username: 'valid', password: 'valid_pass'};

        expect((component as any).user.emit).toHaveBeenCalledWith(newUser);
    });
});

