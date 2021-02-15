import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseInterface } from '@app/auth/interfaces/auth-response.interface';
import { CurrentUserSelectors } from '@app/store/current-user/current-user.selectors';
import { environment } from '@env/environment';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first, map, single, switchMap } from 'rxjs/operators';

/**
 * Sets headers while requesting api endpoints
 */
@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  @Select(CurrentUserSelectors.tokens)
  public tokens$: Observable<AuthResponseInterface>;

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      const url = new URL(req.url);
      if (url.origin !== environment.backend.url ) {
        return next.handle(req);
      }
    } catch (e) {
      return next.handle(req);
    }

    return this.tokens$
      .pipe(
        first(),
        map(tokens => tokens?.access_token),
        switchMap(token => {
          let headers;
          if (this.getAuthUrls().includes(req.url)) {
            headers = req.headers.append('Authorization', `Basic ${
              btoa(`${environment.client_id}:${environment.client_secret}`)}`)
              .append('Content-Type', 'application/json');
          } else if (token) {
            headers = req.headers.append('Authorization', `Bearer ${  token}`)
              .append('Content-Type', 'application/json');
          }

          return next.handle(req.clone({ headers }));
        }),
      );
  }

  private getAuthUrls(): string[] {
    return [
      environment.backend.url + environment.backend.refresh,
    ];
  }
}
