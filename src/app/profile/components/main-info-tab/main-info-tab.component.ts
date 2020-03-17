import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User} from '@app/core/models/user';
import {ProfileService} from '@app/profile/services/profile.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
    selector: 'app-main-info-tab',
    templateUrl: './main-info-tab.component.html',
    styleUrls: ['./main-info-tab.component.scss'],
})
export class MainInfoTabComponent implements OnInit {

    public form: FormGroup;
    public availableAddsLanguages$: BehaviorSubject<string[]>;

    constructor(
        private profileService: ProfileService
    ) {
    }

    public ngOnInit(): void {
        this.availableAddsLanguages$ = this.profileService.getAvailableAdditionalLanguages$();
        this.profileService.createProfileForm$().subscribe(
            form => {
                this.form = form;
                this.profileService.recomputeAdditionalLanguages();
            }
        );
    }

    public genderList$(): Observable<string[]> {
        return this.profileService.getGenders$();
    }

    public languages$(): Observable<string[]> {
        return this.profileService.getLanguages$();
    }

    public recomputeAdditionalLanguages(): void {
        this.profileService.recomputeAdditionalLanguages();
    }

// TODO: Is there best way for trim input values ?
    public submit(): void {
        if (this.form.valid) {
            const user: User = this.form.value as User;
            this.profileService.updateUser(user);
        }
    }

    public getAvatar(): string {
        return this.form.get('avatar').value || 'assets/images/profile/noavatar.jpeg';
    }

    public isSubmitDisabled(): boolean {
        return !(this.form.dirty && this.form.valid);
    }
}
