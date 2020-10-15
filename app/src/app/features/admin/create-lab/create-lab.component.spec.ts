import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLabComponent } from './create-lab.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LabService } from '../services/lab.service';
import { LogService } from 'src/app/core/log-services/log.service';
import { FormBuilder } from '@angular/forms';
import { CityService } from 'src/app/shared/services/cities.service';
import { StateService } from 'src/app/shared/services/states.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LogPublishersService } from 'src/app/core/log-services/log-publishers.service';

xdescribe('CreateLabComponent', () => {
  let component: CreateLabComponent;
  let fixture: ComponentFixture<CreateLabComponent>;
  // let fb: FormBuilder;
  let route: ActivatedRoute;
  let labService: LabService;
  let router: Router;
  let logService: LogService;
  let cityService: CityService;
  // let stateService: StateService;
  // let store: Store<AppState>;
  // let logPublishersService: LogPublishersService ;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      declarations: [ CreateLabComponent ],
      providers: [FormBuilder, LogService, CityService, StateService, LabService, LogPublishersService, Store]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLabComponent);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    labService = TestBed.inject(LabService);
    logService = TestBed.inject(LogService);
    cityService = TestBed.inject(CityService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
