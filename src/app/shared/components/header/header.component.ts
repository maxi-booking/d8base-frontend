import { Component } from '@angular/core';
import { UserLocation } from '@app/api/models';
import { AuthenticationService, MasterManagerService, PlatformService } from '@app/core/services';
import { UnreadMessagesService } from '@app/core/services/unread-messages.service';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { MenuController } from '@ionic/angular';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import HeaderContext from './header-context.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public context$: Observable<HeaderContext>;
  public defaultLocation$: Observable<UserLocation>;
  public countOfUnreadMessages$ = this.unreadMessagesService.unreadMessagesCount();
  public readonly isDesktop: boolean;
  private readonly isAuthenticated$: Observable<boolean>;

  constructor(
    private readonly menuController: MenuController,
    public readonly unreadMessagesService: UnreadMessagesService,
    userManager: UserManagerService,
    authenticator: AuthenticationService,
    masterManager: MasterManagerService,
    platformService: PlatformService,
  ) {
    this.isAuthenticated$ = authenticator.isAuthenticated$;
    this.context$ = combineLatest([
      this.isAuthenticated$,
      masterManager.isMaster$,
    ]).pipe(
      map(([isAuthenticated, isMaster]) => ({isAuthenticated, isMaster})),
    );
    this.defaultLocation$ = userManager.defaultLocation$.pipe(filter(x => !!x));
    this.isDesktop = platformService.isDesktop();
  }

  /**
   * Enable/disable the specified menu. A workaround for wide (desktop) screen only
   */
  public toggleMenu(menuId: string): void {
    this.menuController.get(menuId).then(menu => {
      if (menu.classList.contains('menu-pane-visible')) {
        // the menu is at the side pane, toggle its disabled flag manually
        menu.disabled = !menu.disabled;
      }
    });
  }
}
