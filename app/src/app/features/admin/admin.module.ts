import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateLabComponent } from './create-lab/create-lab.component';
import { ListLabComponent } from './list-lab/list-lab.component';
import { SharedModule } from '../../shared/shared.module';
import { LabService } from './services/lab.service';
import { LabEffects } from './store/lab.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    CreateLabComponent,
    ListLabComponent,
  ],
  imports: [
    AdminRoutingModule,
    SharedModule,
    EffectsModule.forFeature([LabEffects])
  ],
  providers: [
    LabService,
    LabEffects,
  ]
})
export class AdminModule { }
