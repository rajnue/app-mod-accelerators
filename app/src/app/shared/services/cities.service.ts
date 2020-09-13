import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { IMaster } from '../models/master.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class CityService {
  masters: IMaster[];
  apiUrl = environment.apiBaseUrl2;

  constructor(private httpclient: HttpClient) {}

  getCities(): Observable<IMaster[]> {
    return this.httpclient
      .get<IMaster[]>(`${this.apiUrl}/cities`)
      .pipe(catchError(this.handleError));
  }

  getCity(id: number): Observable<IMaster> {
    return this.httpclient
      .get<IMaster>(`${this.apiUrl}/cities/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse instanceof ErrorEvent) {
      console.error('client side error ', errorResponse);
    } else {
      console.error('server side error ', errorResponse);
    }
    return throwError('There is problem with server. Please try again!!');
  }
}
