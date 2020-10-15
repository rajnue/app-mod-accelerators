import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../../layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
    { path: 'access', component: LayoutComponent,
      children: [
          { path: 'login',  component: LoginComponent },
          { path: 'register', component: RegisterComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class AccessRoutingModule { }
