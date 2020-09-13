import { Injectable } from "@angular/core";
import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";

import { ILab } from "../models/lab.model";

@Injectable()
export class RegistrationService {
  constructor(private httpclient: HttpClient) {}

  base_url = "http://localhost:3000/Lab";

  getLabs(): Observable<ILab[]> {
    return this.httpclient
      .get<ILab[]>(this.base_url)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse instanceof ErrorEvent) {
      console.error("client side error ", errorResponse);
    } else {
      console.error("server side error ", errorResponse);
    }
    return throwError("There is problem with server. Please try again!!");
  }
}
