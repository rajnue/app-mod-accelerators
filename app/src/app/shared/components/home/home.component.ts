import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { IUser } from '../../../core/auth/user.model';
import { UserService } from '../../../core/auth/user.service';
import { AuthenticationService } from '../../../features/access/services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading = false;
    currentUser: IUser;
    userFromApi: IUser;
    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loading = true;

        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
    }

}
