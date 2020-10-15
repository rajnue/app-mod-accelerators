import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DiagnosisRoutingModule } from './diagnosis-routing.module';
import { CreateDiagnosisComponent } from './create-diagnosis/create-diagnosis.component';
import { DiagnoisListComponent } from './diagnois-list/diagnois-list.component';
import { DiagnosisService } from './services/diagnosis.service';


@NgModule({
  declarations: [
  CreateDiagnosisComponent,
  DiagnoisListComponent,
],
  imports: [
    SharedModule,
    DiagnosisRoutingModule,
  ],
  providers: [DiagnosisService]
})
export class DiagnosisModule { }
