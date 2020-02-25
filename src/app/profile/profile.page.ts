import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {ProfileService} from '@app/profile/services/profile.service';
import {User} from '@app/shared/models/user';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

    public form: FormGroup;
    public availableAddsLanguages$: BehaviorSubject<string[]>;

    constructor(
        private profileService: ProfileService,
        private userManager: UserManagerService
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
            const profileUser: User = this.form.value as User;
            this.userManager.updateUser(profileUser).subscribe(
                (user: User) => console.log(user)
            );
        }
    }
}