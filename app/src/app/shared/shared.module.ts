import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { AdminheaderComponent } from 'src/app/shared/components/adminheader/adminheader.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { NoheaderComponent } from 'src/app/shared/components/noheader/noheader.component';
import { DiagnosisheaderComponent } from 'src/app/shared/components/diagnosisheader/diagnosisheader.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { ButtonColorDirective } from './directives/button-color.directive';
import { CustomNamePrefixPipe } from './pipes/custom-name-prefix.pipe';
import { PasswordPatternDirective } from './directives/password-pattern.directive';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { ValidateUserNameDirective } from './directives/validate-user-name.directive';
import { TableModule} from 'primeng/table';
import { CityService } from './services/cities.service';
import { StateService } from './services/states.service';
import { LabsService } from './services/labs.service';
import { SuccessMessageComponent } from './components/alerts/success-message/success-message.component';
import { AppPhoneValidateDirective } from './directives/phone-number-validate.directive';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    ErrorComponent,
    AdminheaderComponent,
    FooterComponent,
    NoheaderComponent,
    DiagnosisheaderComponent,
    PageNotFoundComponent,
    ButtonColorDirective,
    CustomNamePrefixPipe,
    PasswordPatternDirective,
    MatchPasswordDirective,
    AppPhoneValidateDirective,
    ValidateUserNameDirective,
    SuccessMessageComponent,
    HomeComponent,
  ],
  imports: [
    RouterModule,
    TableModule
  ],
  exports: [
    ErrorComponent,
    AdminheaderComponent,
    FooterComponent,
    NoheaderComponent,
    DiagnosisheaderComponent,
    SuccessMessageComponent,
    PageNotFoundComponent,
    ButtonColorDirective,
    PasswordPatternDirective,
    MatchPasswordDirective,
    AppPhoneValidateDirective,
    ValidateUserNameDirective,
    CustomNamePrefixPipe,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    TableModule,
    HomeComponent,
  ],
  providers: [
    CityService,
    StateService,
    LabsService,
  ]
})
export class SharedModule { }
