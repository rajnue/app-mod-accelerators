import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCacheService } from './http-cache.service';


@Injectable()
export class CacheInterceptor implements HttpInterceptor {

constructor(private cacheService: HttpCacheService) { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // pass along non-cacheable requests and invalidate cache

    if (req.urlWithParams.indexOf('/users/authenticate') < 0){
        const cachedResponse = this.cacheService[req.urlWithParams] || null;

        if (cachedResponse){
            console.log('response from cache');
            return of(cachedResponse);
        }
    }


     // send request to server and add response to cache
    return next.handle(req)
     .pipe(
       tap(event => {
         if (event instanceof HttpResponse && req.urlWithParams.indexOf('/users/authenticate') < 0) {
           console.log(`Adding item to cache: ${req.urlWithParams}`);
           this.cacheService[req.urlWithParams] = event;
           console.log('response from server');
         }
       })
     );

  }
}
