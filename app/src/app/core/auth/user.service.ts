import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { IUser } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<IUser[]>(`${environment.apiBaseUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<IUser>(`${environment.apiBaseUrl}/users/${id}`);
    }
}
