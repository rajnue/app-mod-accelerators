import { Component, OnInit } from '@angular/core';
import { IUser } from '../core/auth/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../features/access/services/authentication.service';
import { Role } from '../core/auth/role';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  currentUser: IUser;
  isAdmin = false;
  title = 'Patient Daignosis Tracker';
  noAccess = false;
  logonuser: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService){
      this.currentUser = this.authenticationService.currentUserValue;

      if (this.currentUser === null){
        this.noAccess = true;
      }
      else{
        if (this.currentUser.role === Role.Admin){
          this.isAdmin = true;
          this.logonuser = this.currentUser.username;
        } else if (this.currentUser.role === Role.User){
          this.isAdmin = false;
          this.logonuser = this.currentUser.username;
        }
      }

    }


  ngOnInit(): void{ }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/access/login']);
  }

}
