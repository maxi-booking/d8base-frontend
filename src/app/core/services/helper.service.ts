import { ProfessionalContactInline } from '@app/api/models';
import {Contact} from '@app/profile/models/contact';
import {ClientContactInterface} from '@app/shared/interfaces/client-contact-interface';
import {environment} from '@env/environment';

export class HelperService {

    public static getDate(date: Date, offset: number): Date {
        const newDay = new Date(date);
        newDay.setDate(date.getDate() + offset);

        return newDay;
    }

    public static getTimeStringFromMinutes(minutes: number): string {
        const hours = Math.floor(minutes / 60);
        const mins = minutes - hours * 60;
        const hoursStr = /^\d$/.test(hours.toString()) ? '0' + hours.toString() : hours;
        const minsStr = /^\d$/.test(mins.toString()) ? '0' + mins.toString() : mins;

        return `${hoursStr}:${minsStr}`;
    }

    public static isNoAuthGetUrl(url: string): boolean {
        for (const noAuthUrl of HelperService.getNoAuthGetEndpoints()) {
            if (url.includes(noAuthUrl)) {
                return true;
            }
        }

        return false;
    }

    public static clear<T>(obj: T): T {
        for (const propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }

        return obj;
    }

    public static clearArray<T>(arr: T[]): T[] {
        arr?.forEach(val => this.clear(val));

        return arr;
    }

    public static getImgBase64(file: Blob | File): Promise<string> {
        return new Promise<string>(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
        });
    }

    public static getRatingTitle(rating: number): string {
        return 'global.rating.' + Math.round(rating).toString(10);
    }


    public static fromDatetime(datetime: string): { date: string; time: string; } {
        return {
            date: datetime.slice(0, 10),
            time: datetime.slice(11, 16)
        };
    }

    public static getNoAvatarLink(): string {
        return 'assets/images/profile/noavatar.jpeg';
    }

    public static declination(num: number, words: string[]): string {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }

    public static calculateContacts(contacts: Contact[], userContacts: ProfessionalContactInline[]): Contact[] {
        const ret = [];
        del: for (const c of contacts) {
            for (const uc of userContacts) {
                if (c.id === uc.contact) {
                    continue del;
                }
            }
            ret.push(c);
        }

        return ret;
    }

    public static calculateAge(birthday: string): number {
        const ageDifMs = Date.now() - (new Date(birthday)).getTime();
        const ageDate = new Date(ageDifMs);

        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    private static getNoAuthGetEndpoints(): string[] {
        return [
            environment.backend.url + environment.backend.rates,
            environment.backend.url + environment.backend.countries,
            environment.backend.url + environment.backend.regions,
            environment.backend.url + environment.backend.subregions,
            environment.backend.url + environment.backend.cities,
            environment.backend.url + environment.backend.districts,
            environment.backend.url + environment.backend.postal_codes,
            environment.backend.url + environment.backend.category,
            environment.backend.url + environment.backend.subcategory,
            environment.backend.url + environment.backend.auth,
            environment.backend.url + environment.backend.reset_password_link,
            environment.backend.url + environment.backend.reset_password,
            environment.backend.url + environment.backend.master_list,
            environment.backend.url + environment.backend.language,
            environment.backend.url + environment.backend.reviews_readonly,
            environment.backend.url + environment.backend.contact,
            environment.backend.url + environment.backend.services_readonly,
            environment.backend.url + environment.backend.service_tag_readonly,
            environment.backend.url + environment.backend.master_photos_readonly,
            environment.backend.url + environment.backend.calendar,
            environment.backend.url + environment.backend.search
        ];
    }
}
