import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiagnosisComponent } from './create-diagnosis.component';

xdescribe('CreateDiagnosisComponent', () => {
  let component: CreateDiagnosisComponent;
  let fixture: ComponentFixture<CreateDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDiagnosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
