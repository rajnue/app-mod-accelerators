import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminheaderComponent } from './adminheader.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../../features/access/services/authentication.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminheaderComponent', () => {
  let component: AdminheaderComponent;
  let fixture: ComponentFixture<AdminheaderComponent>;
  let BedAuthenticationService: AuthenticationService;
  let Bedrouter: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule],
      declarations: [ AdminheaderComponent ],
      providers: [AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    BedAuthenticationService = TestBed.get(AuthenticationService);
    Bedrouter = TestBed.get(Router);
  });

  it('should be an instance of "AuthenticationService"', () => {
    expect(BedAuthenticationService instanceof AuthenticationService).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
