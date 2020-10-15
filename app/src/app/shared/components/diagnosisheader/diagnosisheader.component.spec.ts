import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/features/access/services/authentication.service';

import { DiagnosisheaderComponent } from './diagnosisheader.component';

describe('DiagnosisheaderComponent', () => {
  let component: DiagnosisheaderComponent;
  let fixture: ComponentFixture<DiagnosisheaderComponent>;
  let authenticationService: AuthenticationService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      declarations: [ DiagnosisheaderComponent ],
      providers: [AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});

