import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DiagnoisListComponent } from './diagnois-list.component';
import { DiagnosisService } from '../services/diagnosis.service';
import { LogService } from '../../../core/log-services/log.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LogPublishersService } from '../../../core/log-services/log-publishers.service';
import { CustomNamePrefixPipe } from 'src/app/shared/pipes/custom-name-prefix.pipe';
import { pipe } from 'rxjs';

describe('DiagnoisListComponent', () => {
  let component: DiagnoisListComponent;
  let fixture: ComponentFixture<DiagnoisListComponent>;
  let diagnosisService: DiagnosisService;
  let logService: LogService;
  let router: Router;
  let namePrifixPipe: CustomNamePrefixPipe;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      declarations: [ DiagnoisListComponent ],
      providers: [
        DiagnosisService,
        LogService,
        LogPublishersService
        ]
    })
    .compileComponents();
    namePrifixPipe = new CustomNamePrefixPipe();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnoisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    logService = TestBed.get(LogService);
    diagnosisService = TestBed.get(DiagnosisService);
    router = TestBed.get(Router);

  });

  it('should check service instance', () => {
    expect(diagnosisService instanceof DiagnosisService ).toBeTruthy();
  });

  it('should transfor the name by custom pipe', () => {
      expect(namePrifixPipe.transform('Raj', 'male')).toBe('Mr. Raj');
  });

});
