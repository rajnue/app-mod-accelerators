import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/auth/auth.guard';
import { Role } from '../../core/auth/role';
import { DiagnoisListComponent } from './diagnois-list/diagnois-list.component';
import { CreateDiagnosisComponent } from './create-diagnosis/create-diagnosis.component';


const appRoutes: Routes = [
            {path: 'diagnosislist', component: DiagnoisListComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin, Role.User] }},
            {path: 'create', component: CreateDiagnosisComponent, canActivate: [AuthGuard], data: { roles: [Role.User] }},
            {path: 'edit/:id', component: CreateDiagnosisComponent, canActivate: [AuthGuard], data: { roles: [Role.User] }},
            {path: 'delete/:id', component: CreateDiagnosisComponent, canActivate: [AuthGuard], data: { roles: [Role.User] }}
        ];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class DiagnosisRoutingModule { }
