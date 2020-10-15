import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { IPatientDiagnois } from '../models/patient-diagnosis.model';
import { LogService } from '../../../core/log-services/log.service';
import { DiagnosisService } from '../services/diagnosis.service';



@Component({
  selector: 'app-diagnois-list',
  templateUrl: './diagnois-list.component.html',
  styleUrls: ['./diagnois-list.component.scss']
})
export class DiagnoisListComponent  implements OnInit {
  patientDiagnoisList: IPatientDiagnois[] = [];
  patientDiagnois: IPatientDiagnois;
  error: string;
  isError = false;
  columns: any[];

  constructor(private diagnosisService: DiagnosisService,
              private router: Router,
              private logService: LogService,
              ) { }


  ngOnInit(): void {
    this.getColumns();

    /** Data from API */
    this.diagnosisService.getDiagnoisList()
         .subscribe(data => this.patientDiagnoisList = data,
          (err) => this.handleError(err));

  }

  getColumns(){
    this.columns = [
      { field: 'id', header: 'ID' },
      { field: 'fullname', header: 'Full Name' },
      // { field: 'address', header: 'Address' },
      { field: 'city', header: 'City' },
      { field: 'state', header: 'State'},
      { field: 'mobileno', header: 'Mobile No'},
      { field: 'status', header: 'Status'},
      { field: '', header: 'Action'}
    ];
  }

  handleError(err: string): void {
    this.error = err;
    this.isError = true;
    this.logService.error(err);
  }

  public editDiagnosis(id: number): void {
    this.router.navigate(['/diagnosis/edit', id]);
  }

}
