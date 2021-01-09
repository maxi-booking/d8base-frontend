import { isPlatformServer } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorList } from '@app/core/enums/error-list';
import { environment } from '@env/environment';
import { ToastController } from '@ionic/angular';
import * as Sentry from '@sentry/angular';

const AUTHENTICATION_ERROR = 'authentication expired';
const GENERIC_SERVER_ERROR = 'server error';
const UNKNOWN_ERROR = 'unexpected error';

function isTokenError(error: Error): boolean {
  return error?.message === ErrorList.EMPTY_TOKEN_ERROR ||
    error?.message === ErrorList.REFRESH_TOKEN_EXPIRED_ERROR;
}

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {

  private readonly ERROR_TOAST_DURATION_MS = 3000;

  constructor(private readonly toaster: ToastController,
              private readonly router: Router,
              @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {
  }

  public handleError(error: Error): void {
    if (environment.sentry.enabled) {
      Sentry.captureException(error);
    }

    if (isTokenError(error)) {
      this.showMessage(AUTHENTICATION_ERROR);
      this.router.navigateByUrl('/auth/login');

      return;
    }

    if (error instanceof HttpErrorResponse) {
      this.handleHttpErrorResponse(error);

      return;
    }

    this.showMessage(UNKNOWN_ERROR);
    throw error;
  }

  private handleHttpErrorResponse(response: HttpErrorResponse): void {
    if (400 === response.status) {
      const all = response.error?.error?.__all__ || response.error?.__all__;
      const messages: string[] = Array.isArray(all)
        ? all
        : Object.entries(response.error).map(e => `${e[0]}: ${e[1]}`);
      if (messages.length > 0) {
        messages.forEach(message => this.showMessage(message));
      } else {
        this.showMessage(response.message);
      }

      return;
    }

    if (401 === response.status || 'invalid_grant' === response.message) {
      if (response.url.endsWith(environment.backend.refresh)) {
        this.showMessage(AUTHENTICATION_ERROR);
        this.router.navigateByUrl('/auth/login');
      }

      return;
    }

    if (5 === Math.floor(response.status / 100)) {
      this.showMessage(GENERIC_SERVER_ERROR);

      return;
    }

    this.showMessage(response.message || UNKNOWN_ERROR);
  }

  private showMessage(message: string, duration: number = this.ERROR_TOAST_DURATION_MS): void {
    if (isPlatformServer(this.platformId)) {
      console.error(message);
    } else {
      this.toaster.create({ message, duration }).then(
        toast => toast.present(),
      );
    }
  }
}
