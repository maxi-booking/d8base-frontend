import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PartialUserInterface} from '@app/core/interfaces/partial-user-interface';
import {Master} from '@app/core/models/master';
import {HelperService} from '@app/core/services/helper.service';
import {Certificate} from '@app/master/models/certificate';
import {Education} from '@app/master/models/education';
import {Experience} from '@app/master/models/experience';
import {MasterContact} from '@app/master/models/master-contact';
import {MasterLocation} from '@app/master/models/master-location';
import {PublicReview} from '@app/master/models/public-review';
import {Tag} from '@app/master/models/tag';
import {MasterProfileInfoGeneratorFactoryService} from '@app/master/services/master-profile-info-generator-factory.service';
import {Country} from '@app/profile/models/country';
import {Language} from '@app/profile/models/language';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-master-profile-info',
    templateUrl: './master-profile-info.component.html',
    styleUrls: ['./master-profile-info.component.scss']
})
export class MasterProfileInfoComponent {

    public editable: Observable<boolean>;
    public master: Master;
    public masterLocation: MasterLocation[];
    public masterContacts: MasterContact[] = [];
    public masterTags: Tag[];
    public user: PartialUserInterface;
    public userCountry: Country;
    public userLanguages: Language[];
    public experienceList: Experience[];
    public educationList: Education[];
    public certificateList: Certificate[];
    public publicReviewList: PublicReview[];
    public readonly editDefaultUrl = 'professional-contact-add-default/';
    public readonly editUrl = 'professional-contact-edit/';
    public readonly addUrl = 'professional-contact-add';


    constructor(
        private readonly masterInfoGeneratorFactory: MasterProfileInfoGeneratorFactoryService,
        private readonly route: ActivatedRoute
    ) {
    }

    public setEditable(editable: Observable<boolean>): void {
        this.editable = editable;
    }

    public init(): void {
        this.masterInfoGeneratorFactory.getData(parseInt(this.route.snapshot.paramMap.get('master-id'), 10)).subscribe(
            data => {
                this.master = data.master;
                this.masterLocation = data.masterLocation.reverse();
                this.masterContacts = data.masterContacts.reverse();
                this.masterTags = data.masterTags.reverse();
                this.user = data.user;
                this.userCountry = data.userCountry;
                this.userLanguages = data.userLanguages.reverse();
                this.experienceList = data.experienceList.reverse();
                this.certificateList = data.certificateList.reverse();
                this.publicReviewList = data.publicReviewList.reverse();
                this.educationList = data.educationList.reverse();
            }
        );
    }

    public declinationYears(num: number): string {
        return HelperService.declination(num, ['declination.years.1', 'declination.years.2', 'declination.years.3']);
    }

    public getYearsFromBirthday(birthday: string): number {
        return HelperService.calculateAge(birthday);
    }

    public getAddress(location: MasterLocation): string {
        return location.address || `${location.country}, ${location.city}`;
    }
}
