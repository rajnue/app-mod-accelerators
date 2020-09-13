import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLabComponent } from './create-lab/create-lab.component';
import { ListLabComponent } from './list-lab/list-lab.component';
import { AuthGuard } from '../../core/auth/auth.guard';
import { Role } from '../../core/auth/role';


const appRoutes: Routes = [
            {path: 'labs', component: ListLabComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
            {path: 'createlab', component: CreateLabComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
            {path: 'editLab/:id', component: CreateLabComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
            {path: 'deleteLab/:id', component: CreateLabComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }}
        ];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
