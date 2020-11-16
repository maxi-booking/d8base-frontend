import {Component, Input} from '@angular/core';
import {AuthenticationFactory} from '@app/core/services';
import {Platform} from '@ionic/angular';
import {MainMenuItem, mainMenuItems} from './main-menu';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
    @Input() public isAuthenticated: boolean;
    @Input() public isMaster: boolean;

    public mainMenuItems = mainMenuItems;

    constructor(
        private readonly authenticationFactory: AuthenticationFactory,
        private readonly platform: Platform
    ) {
    }

    public isShown(item: MainMenuItem): boolean {
        if (item.guestOnly && this.isAuthenticated) {
            return false;
        }

        if (item.desktopOnly && !this.platform.is('desktop')) {
            return false;
        }

        if ((item.userOnly || item.masterOnly) && !this.isAuthenticated) {
            return false;
        }

        return !(item.clientOnly && !item.masterOnly && this.isMaster);
    }
}