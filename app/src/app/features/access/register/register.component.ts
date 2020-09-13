import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILab } from '../models/lab.model';
import { LogService } from '../../../core/log-services/log.service';
import { RegistrationService } from '../services/registration.service';
import { Register } from '../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  labs: ILab[] = [];
  error: string;
  isError = false;
  submitted = false;

  constructor(private labservice: RegistrationService,
              private router: Router,
              private logService: LogService ) { }

  model = new Register();

  ngOnInit(): void {
    this.labservice.getLabs()
                  .subscribe(data => {
                   this.labs = data,
                   (err) => this.handleError(err);
                  });
  }

  handleError(err: string): void {
    this.error = err;
    this.isError = true;
    this.logService.error(err);
  }

  onRegister(value: any): string{
    this.submitted = true;
    return 'Successful Register!!';
  }

  public redirectTologin(): void {
    this.router.navigate(['/login']);
  }

}
