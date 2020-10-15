import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { ILab } from '../model/lab.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class LabService {
  constructor(private httpclient: HttpClient) {}

  apiUrl = environment.apiBaseUrl2;

  getLabs(): Observable<ILab[]> {
    return (
      this.httpclient
        .get<ILab[]>(`${this.apiUrl}/Lab`)
        // .pipe( delay(1000))
        .pipe(catchError(this.handleError))
    );
  }

  getLab(id: number): Observable<ILab> {
    return (
      this.httpclient
        .get<ILab>(`${this.apiUrl}/Lab/${id}`)
        // .pipe( delay(1000))
        .pipe(catchError(this.handleError))
    );
  }

  addLab(lab: ILab): Observable<ILab> {
    return (
      this.httpclient
        .post<ILab>(`${this.apiUrl}/Lab`, lab, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        })
        // .pipe( delay(1000))
        .pipe(catchError(this.handleError))
    );
  }

  updateLab(lab: ILab): Observable<void> {
    return (
      this.httpclient
        .put<void>(`${this.apiUrl}/Lab/${lab.id}`, lab, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        })
        // .pipe( delay(1000))
        .pipe(catchError(this.handleError))
    );
  }

  deleteLab(id: number): Observable<void> {
    return (
      this.httpclient
        .delete<void>(`${this.apiUrl}/Lab/${id}`, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        })
        // .pipe( delay(1000))
        .pipe(catchError(this.handleError))
    );
  }

  // Delete
  //////

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse instanceof ErrorEvent) {
      console.error('client side error ', errorResponse);
    } else {
      console.error('server side error ', errorResponse);
    }
    return throwError('There is problem with server. Please try again!!');
  }
}
