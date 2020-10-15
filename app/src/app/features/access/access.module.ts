import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AccessRoutingModule } from './access.routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationService } from './services/registration.service';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    SharedModule,
    AccessRoutingModule,
    FormsModule
  ],
  providers: [RegistrationService]
})
export class AccessModule { }
