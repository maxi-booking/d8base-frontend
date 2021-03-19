import { Component, Input } from '@angular/core';
import { PlatformService } from '@app/core/services';
import { MainMenuItem, mainMenuItems } from './main-menu';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  @Input() public isAuthenticated: boolean;
  @Input() public isMaster: boolean;

  public mainMenuItems = mainMenuItems;

  constructor(
    private readonly platformService: PlatformService,
  ) {
  }

  public isShown(item: MainMenuItem): boolean {
    if (item.guestOnly && this.isAuthenticated) {
      return false;
    }

    if (item.desktopOnly && !this.platformService.isDesktop()) {
      return false;
    }

    if ((item.userOnly || item.masterOnly || item.clientOnly) && !this.isAuthenticated) {
      return false;
    }

    if (item.clientOnly && this.isMaster) {
      return false;
    }

    return !(item.masterOnly && !this.isMaster);
  }
}
