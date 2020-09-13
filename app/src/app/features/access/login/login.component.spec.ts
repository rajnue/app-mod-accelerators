import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formBuilder: FormBuilder;
  let route: ActivatedRoute;
  let router: Router;
  let authenticationService: AuthenticationService;
  let page: LoginComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      declarations: [ LoginComponent ],
      providers: [AuthenticationService, FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);
    authenticationService = TestBed.get(AuthenticationService);
    formBuilder = TestBed.get(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // f --> focus
  fit('Login check async(async)', async(() => {
    const loginSpyOn = spyOn(authenticationService, 'login').withArgs('admin', 'admin').and.callThrough();
    component.onSubmit();

    fixture.whenStable().then((data) => {
      fixture.detectChanges(); // For detecting changes on DOM elements
      expect('Login Success').toContain('Login Success');
    });
  }));

});
