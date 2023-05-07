import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

export class YoutubeApiInterceptor implements HttpInterceptor {
  BASE_URL = 'https://www.googleapis.com/youtube/v3';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cloned = req.clone({
      url: this.BASE_URL + req.url,
      params: req.params.append(
        'key',
        'AIzaSyBnCnguumN5B3nWj6GjgOlXYYO2xkO4zwU'
      ),
    });

    return next.handle(cloned);
  }
}
