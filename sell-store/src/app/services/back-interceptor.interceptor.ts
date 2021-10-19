/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SkipInterceptor = 'X-Skip-Interceptor';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const WriteObject = 'X-Write-Object';
@Injectable()
export class BackInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // This will skip the interception if SkipInterceptor header is present
    if (request.headers.has(SkipInterceptor)) {
      const headers: HttpHeaders = request.headers.delete(SkipInterceptor);
      return next.handle(request.clone({ headers }));
    }

    // This will also skip interceptioon if WriteObject is present
    if (request.headers.has(WriteObject)) {
      const headers: HttpHeaders = request.headers.delete(WriteObject);
      const updatedRequest: HttpRequest<unknown> = request.clone({
        setParams: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          consumer_key: environment.writeOnlyKeys.consumer_key,
          consumer_secret: environment.writeOnlyKeys.consumer_secret,
        },
        headers,
      });
      return next.handle(updatedRequest);
    }

    // If both the headers are not present, process normally

    const modifiedRequest: HttpRequest<unknown> = request.clone({
      setParams: {
        consumer_key: environment.readOnlyKeys.consumer_key,
        consumer_secret: environment.readOnlyKeys.consumer_secret,
      },
    });
    return next.handle(modifiedRequest);
  }
}
