import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Profile, UserContact, UserLanguage } from '@app/api/models';
import { UserLocation } from '@app/core/models/user-location';
import { NgDestroyService } from '@app/core/services';
import { ContactsMergeToDefaultService } from '@app/core/services/contacts-merge-to-default.service';
import { HelperService } from '@app/core/services/helper.service';
import { ProfileFormFields } from '@app/profile/enums/profile-form-fields';
import { ProfileService } from '@app/profile/services/profile.service';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import UserContactSelectors from '@app/store/current-user/user-contacts/user-contacts.selectors';
import UserLanguagesSelectors from '@app/store/current-user/user-language-state/user-language.selectors';
import { Actions, ofActionSuccessful, Select } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  providers: [NgDestroyService],
})
export class ProfilePage {
  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  @Select(UserLanguagesSelectors.entities)
  public userLanguages$: Observable<UserLanguage[]>;

  @Select(UserContactSelectors.contacts)
  public contacts$: Observable<UserContact[]>;

  public newEmailRegistered$: Observable<CurrentUserActions.RegisterNewEmail['newEmail']> = this.actions$.pipe(
    ofActionSuccessful(CurrentUserActions.RegisterNewEmail),
    map((action: CurrentUserActions.RegisterNewEmail) => action.newEmail),
    takeUntil(this.ngDestroy$),
  );

  public contactsWithDefault$: Observable<UserContact[]>;

  public avatar$: Observable<string>;
  public avatarSelector = new FormControl();

  public formFields = ProfileFormFields;
  public defaultLocation$: BehaviorSubject<UserLocation> = new BehaviorSubject<UserLocation>(null);
  public additionalLocationsList$: BehaviorSubject<UserLocation[]> = new BehaviorSubject<UserLocation[]>([]);

  constructor(
    public readonly profileService: ProfileService,
    private readonly contactsMergeToDefaultService: ContactsMergeToDefaultService,
    private readonly ngDestroy$: NgDestroyService,
    private readonly actions$: Actions,
  ) {
    this.avatar$ = this.profile$.pipe(
      filter(x => !!x),
      map(profile => profile.avatar || HelperService.getNoAvatarLink()),
    );
    this.subOnAvatarChange();
    this.initLocation();
    this.initContactsWithDefault();
  }

  private subOnAvatarChange(): void {
    this.avatarSelector.valueChanges
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(avatar => this.profileService.updateUser({ avatar }));
  }

  private initLocation(): void {
    this.profileService.initLocation().subscribe(locationList => {
      this.defaultLocation$.next(locationList.pop() as UserLocation);
      this.additionalLocationsList$.next(locationList as UserLocation[]);
    });
  }

  private initContactsWithDefault(): void {
    this.contactsWithDefault$ = this.contactsMergeToDefaultService.contactsMergedWithDefault(this.contacts$);
  }
}
