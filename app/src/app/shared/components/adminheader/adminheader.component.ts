import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from '../../../features/access/services/authentication.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.scss'],
})
export class AdminheaderComponent implements OnInit {
  @Input() logOnUser: string;
  environmentName: string = environment.name;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/access/login']);
  }
}
