import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediaIconFactoryService} from '@app/core/services/media-icon-factory.service';
import {UserContactEditComponent} from '@app/profile/components/user-contact-edit/user-contact-edit.component';
import {UserContact} from '@app/profile/models/user-contact';
import {ContactApiService} from '@app/profile/services/contact-api.service';
import {UserContactApiService} from '@app/profile/services/user-contact-api.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {BehaviorSubject, forkJoin, Subscription} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';

@Component({
    selector: 'app-contacts-add',
    templateUrl: './contacts-add.component.html',
    styleUrls: ['./contacts-add.component.scss'],
})
export class ContactsAddComponent extends Reinitable implements OnInit, OnDestroy {

    public static reinit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public userContacts$: BehaviorSubject<UserContact[]> = new BehaviorSubject<UserContact[]>([]);
    public canAddNewContact$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private subscription: Subscription = null;
    private inited: boolean = false;

    constructor(public userContactApiService: UserContactApiService, private contactsApi: ContactApiService) {
        super();
    }

    public ngOnInit(): void {
        this.userContactApiService.getCurrentClientContacts().subscribe(
            contacts => this.userContacts$.next(contacts.results)
        );
        this.canAddNewContact();
        this.subToReinit();
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public getContactIcon(contactDisplay: string): string {
        return MediaIconFactoryService.getIcon(contactDisplay);
    }

    private subToReinit(): void {
        if (!this.inited) {
            this.inited = true;
            this.subscription = ContactsAddComponent.reinit$.pipe(
                filter(val => val === true),
                debounceTime(150)
            ).subscribe(val => this.ngOnInit());
        }
    }

    private canAddNewContact(): void {
        forkJoin({
            contacts: this.contactsApi.get(),
            userContacts: this.userContactApiService.getCurrentClientContacts()
        }).subscribe(
            ({contacts, userContacts}) => {
                if (UserContactEditComponent.calculateContacts(contacts.results, userContacts.results).length === 0) {
                    this.canAddNewContact$.next(false);
                }
            }
        );
    }
}