import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {UserContact} from '@app/profile/models/user-contact';
import {ClientContactInterface} from '@app/shared/interfaces/client-contact-interface';
import {ContactsApiServiceInterface} from '@app/shared/interfaces/contacts-api-service-interface';
import {plainToClass} from 'class-transformer';
import {forkJoin, Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserContactApiService implements ContactsApiServiceInterface {

    private readonly url = environment.backend.user_contact;

    constructor(private api: ApiClientService) {
    }

    public getByClientId(id: number): Observable<ApiListResponseInterface<ClientContactInterface>> {
        return this.getCurrentClientContacts();
    }

    public saveList(contactsList: ClientContactInterface[]): Observable<ClientContactInterface[]> {
        return 0 === contactsList.length ? of([]) : of(contactsList).pipe(
            mergeMap((contacts) => forkJoin(
                ...contacts.map(contact => this.api.post<UserContact>(this.url, contact))
            ))
        );
    }

    public updateList(contactsList: ClientContactInterface[]): Observable<ClientContactInterface[]> {
        return 0 === contactsList.length ? of([]) :  of(contactsList).pipe(
            mergeMap((contacts) => forkJoin(
                ...contacts.map(contact => this.api.put<UserContact>(`${this.url}${contact.id}/`, contact))
            ))
        );
    }

    public deleteList(contactsList: ClientContactInterface[]): Observable<any> {
        return 0 === contactsList.length ? of([]) :  of(contactsList).pipe(
            mergeMap((contacts) => forkJoin(
                ...contacts.map(contact => this.api.delete(`${this.url}${contact.id}/`))
            ))
        );
    }

    public getCurrentClientContacts(): Observable<ApiListResponseInterface<ClientContactInterface>> {
        return this.api.get<ApiListResponseInterface<UserContact>>(this.url).pipe(
            map(response => {
                response.results = plainToClass(UserContact, response.results);

                return response;
            })
        );
    }
}
