
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

xdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Patient Diagnosis Tracker'`, () => {
    expect(component.title).toEqual('Patient Diagnosis Tracker');
  });

  it('button custom directive', () => {
    const btnBGColr = fixture.debugElement.query(By.css('button'));
    btnBGColr.triggerEventHandler('click', {});

    fixture.detectChanges();

    btnBGColr.triggerEventHandler('mouseover', null);
    fixture.detectChanges();

  });

});
