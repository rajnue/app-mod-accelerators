import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonColorDirective } from './shared/directives/button-color.directive';
import { StoreModule } from '@ngrx/store';
import { LabReducer } from './features/admin/store/lab.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { LabEffects } from './features/admin/store/lab.effects';
import { LabService } from './features/admin/services/lab.service';

@NgModule({
  declarations: [
    AppComponent,
    // ButtonColorDirective
  ],
  imports: [
    BrowserModule,
    CoreModule,
    LayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ labs: LabReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot(),
    // MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
