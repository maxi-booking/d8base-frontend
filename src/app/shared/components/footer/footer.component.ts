import { Component } from '@angular/core';
import { PlatformService } from '@app/core/services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public readonly isDesktop: boolean;
  constructor(platformService: PlatformService) {
    this.isDesktop = platformService.isDesktop();
  }
}
