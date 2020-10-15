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
export class StateService {
  masters: IMaster[];
  apiUrl = environment.apiBaseUrl2;

  constructor(private httpclient: HttpClient) {}

  getStates(): Observable<IMaster[]> {
    return this.httpclient
      .get<IMaster[]>(`${this.apiUrl}/states`)
      .pipe(catchError(this.handleError));
  }

  getState(id: number): Observable<IMaster> {
    return this.httpclient
      .get<IMaster>(`${this.apiUrl}/states/${id}`)
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
