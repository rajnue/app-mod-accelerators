import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoheaderComponent } from './noheader.component';

describe('NoheaderComponent', () => {
  let component: NoheaderComponent;
  let fixture: ComponentFixture<NoheaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NoheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});

