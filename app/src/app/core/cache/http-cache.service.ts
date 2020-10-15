import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest } from '@angular/common/http';

abstract class HttpCache{
   abstract put(req: HttpRequest<any>, resp: HttpResponse<any>): void;
   abstract get(req: HttpRequest<any>): HttpResponse<any>|null;
}

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService implements HttpCache {

  private cache: any = { };

  constructor() { }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    this.cache[req.urlWithParams] = response;
  }

  get(req: HttpRequest<any>): HttpResponse<any>|null {
    return this.cache[req.urlWithParams];
  }

  invalidateCache(): void {
    this.cache = { };
  }
}
