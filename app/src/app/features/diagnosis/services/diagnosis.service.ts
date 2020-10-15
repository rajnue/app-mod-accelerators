import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { IPatientDiagnois } from '../models/patient-diagnosis.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DiagnosisService {
  constructor(private httpclient: HttpClient) {}

  apiUrl = environment.apiBaseUrl2;

  getDiagnoisList(): Observable<IPatientDiagnois[]> {
    return this.httpclient
      .get<IPatientDiagnois[]>(`${this.apiUrl}/diagnosis`)
      .pipe(catchError(this.handleError));
  }

  getDiagnoisById(id: number): Observable<IPatientDiagnois> {
    return this.httpclient
      .get<IPatientDiagnois>(`${this.apiUrl}/diagnosis/${id}`)
      .pipe(catchError(this.handleError));
  }

  addDiagnois(lab: IPatientDiagnois): Observable<IPatientDiagnois> {
    return this.httpclient
      .post<IPatientDiagnois>(`${this.apiUrl}/diagnosis`, lab, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.handleError));
  }

  updateDiagnois(lab: IPatientDiagnois): Observable<void> {
    return this.httpclient
      .put<void>(`${this.apiUrl}/diagnosis/${lab.id}`, lab, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.handleError));
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
