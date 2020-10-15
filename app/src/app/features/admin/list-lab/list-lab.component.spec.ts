import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { LogPublishersService } from 'src/app/core/log-services/log-publishers.service';
import { LogService } from 'src/app/core/log-services/log.service';
import { LabService } from '../services/lab.service';

import { ListLabComponent } from './list-lab.component';


xdescribe('ListLabComponent', () => {
  let component: ListLabComponent;
  let fixture: ComponentFixture<ListLabComponent>;
  let labService: LabService;
  let logService: LogService;
  let logPublishersService: LogPublishersService;
  let store: Store;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, HttpClientModule, RouterTestingModule, FormsModule, ReactiveFormsModule ],
      declarations: [ ListLabComponent ],
      providers: [ LabService, LogService, LogPublishersService, Store ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    labService = TestBed.inject(LabService);
    logService = TestBed.inject(LogService);
    logPublishersService = TestBed.inject(LogPublishersService);
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

