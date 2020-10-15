import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterComponent } from './register.component';
import { RegistrationService } from '../services/registration.service';
import { LogService } from 'src/app/core/log-services/log.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LogPublishersService } from 'src/app/core/log-services/log-publishers.service';
import { SharedModule } from 'src/app/shared/shared.module';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let registrationService: RegistrationService;
  let logService: LogService;
  // let logPublishersService: LogPublishersService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule, SharedModule ],
      declarations: [ RegisterComponent ],
      providers: [RegistrationService, LogService, LogPublishersService, NgForm]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    logService = TestBed.inject(LogService);
    registrationService = TestBed.inject(RegistrationService);
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('register user', () => {
    const value = {name: 'Raj', Address: 'sdfasdfsad'};
    const result = component.onRegister(value);
    expect(result).toEqual('Successful Register!!');

  });

});
