import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules, NoPreloading } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { HomeComponent } from './shared/components/home/home.component';


const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent, // Layout
    children: [
      { path: 'home',  component: HomeComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) }, // lazy loading
      { path: 'diagnosis', loadChildren: () => import('./features/diagnosis/diagnosis.module').then(m => m.DiagnosisModule) }, // lazy loading
      { path: '**', component: PageNotFoundComponent}
    ]
  }

];

@NgModule({
  imports: [SharedModule, RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
