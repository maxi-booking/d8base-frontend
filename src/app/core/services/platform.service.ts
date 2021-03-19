import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { FcmDeviceService } from '@app/core/services/fcm-device.service';
import { environment } from '@env/environment';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import firebase from 'firebase';
import { NotificationWorkerService } from './notification-worker.service';

@Injectable({ providedIn: 'root' })
export class PlatformService {
  constructor(
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    private readonly notificationWorker: NotificationWorkerService,
    private readonly fcmDevice: FcmDeviceService,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
    }
    this.initializePlatform().then();
  }

  public isDesktop(): boolean {
      return !isPlatformServer(this.platformId) && this.platform.is('desktop');
  }

  private async initializePlatform(): Promise<void> {
    await this.platform.ready();
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    await this.notificationWorker.init();
    await this.notificationWorker.requestPermission();
    this.fcmDevice.subscribeToAuth();
  }
}
