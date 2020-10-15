import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LogService } from '../../../core/log-services/log.service';
import { IPatientDiagnois } from '../models/patient-diagnosis.model';
import { DiagnosisService } from '../services/diagnosis.service';
import { IMaster } from '../../../shared/models/master.model';
import { CityService } from '../../../shared/services/cities.service';
import { StateService } from '../../../shared/services/states.service';
import { LabsService } from '../../../shared/services/labs.service';
import { ValidatePhone } from '../../../shared/directives/phone-number-validate.directive';


@Component({
  selector: 'app-create-diagnosis',
  templateUrl: './create-diagnosis.component.html',
  styleUrls: ['./create-diagnosis.component.scss']
})
export class CreateDiagnosisComponent implements OnInit {

  diagnosisForm: FormGroup;
  patientDiagnois: IPatientDiagnois;
  error: string;
  isError = false;
  cities: IMaster[];
  states: IMaster[];
  state: IMaster;
  city: IMaster;
  labs: IMaster[];
  lab: IMaster;
  pageLabel: string ;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private diagnosisService: DiagnosisService,
              private router: Router,
              private cityService: CityService,
              private stateService: StateService,
              private labsService: LabsService,
              private logService: LogService) {
                console.log('called constructor. ');

              }

  validationMessages = {
    fullname: {
      required: 'Full Name is required.',
    },
    address: {
      required: 'Address is required.',
    },
    city: {
      required: 'City is required.',
    },
    state: {
      required: 'State is required.'
    },
    mobileno: {
      required: 'Mobile No is required.',
      // 'minlength': 'Mobile No must be 10 digits.',
      // 'maxlength': 'Mobile No must be 10 digits.',
      phoneNumberInvalid: 'Mobile No must be 10 digits.' // Custom Validation
    },
    status: {
      required: 'Status is required.'
    },
    lab : {
      required: 'Lab is required.'
    }
  };

  formErrors = {
    fullname: '',
    address: '',
    city : '',
    state : '',
    mobileno: '',
    status: '',
    lab: '',
  };

  ngOnInit(): void {
    console.log('called ngOnInit. ');
    this.loadCities();
    this.loadStates();
    this.loadLabs();

    this.diagnosisForm = this.fb.group({
                        fullname: ['', Validators.required],
                        address: ['', [Validators.required]],
                        city: ['', Validators.required],
                        state: ['', Validators.required],
                        // mobileno:["",[Validators.required,Validators.maxLength(10), Validators.minLength(10)]],
                        mobileno: ['', [Validators.required, ValidatePhone]],
                        status: ['', Validators.required],
                        lab: ['', Validators.required]
    });

    this.diagnosisForm.valueChanges.subscribe(value => {
      this.logValidationErrors(this.diagnosisForm);
    });

    this.route.paramMap.subscribe(params => {
      const diagnosisid = + params.get('id');
      if (diagnosisid) {
        this.getDiagnosis(diagnosisid);
        this.pageLabel = 'Edit Diagnosis';
      }
      else{
        this.pageLabel = 'New Diagnosis';
        this.patientDiagnois = {
          id: null,
          fullname: '',
          address: '',
          city : '',
          state: '',
          mobileno: '',
          status: 0,
          testedOn: '',
          lab: ''
        };
      }
    });
  }
  getDiagnosis(id: number) {
    this.diagnosisService.getDiagnoisById(id).subscribe(
      (patientDiagnois: IPatientDiagnois) => {
        this.editDiagnosis(patientDiagnois);
        this.patientDiagnois = patientDiagnois;
      },
      (err: any) => this.handleError(err)
    );
  }

  editDiagnosis(patientDiagnois: IPatientDiagnois) {
    this.diagnosisForm.patchValue({
      fullname: patientDiagnois.fullname,
      address: patientDiagnois.address,
      city: patientDiagnois.city,
      state: patientDiagnois.state,
      mobileno: patientDiagnois.mobileno,
      status: patientDiagnois.status,
      testedOn: patientDiagnois.testedOn,
      lab: patientDiagnois.lab
    });
  }

  onSubmit(): void {

    // stop here if form is invalid
    if (this.diagnosisForm.invalid) {
      return;
    }

    this.mapFormValueToLabModel();

    if (this.patientDiagnois.id){
     this.diagnosisService.updateDiagnois(this.patientDiagnois)
          .subscribe(() => this.router.navigate(['/diagnosis/diagnosislist']),
          () => (err) => this.handleError(err));
    }
    else{
      this.diagnosisService.addDiagnois(this.patientDiagnois)
          .subscribe(() => this.router.navigate(['/diagnosis/diagnosislist']),
          (err) => this.handleError(err));
    }
  }


  mapFormValueToLabModel(): void {
    this.patientDiagnois.fullname = this.diagnosisForm.value.fullname;
    this.patientDiagnois.address = this.diagnosisForm.value.address;
    this.patientDiagnois.city = this.diagnosisForm.value.city;
    this.patientDiagnois.state = this.diagnosisForm.value.state;
    this.patientDiagnois.mobileno = this.diagnosisForm.value.mobileno;
    this.patientDiagnois.status = this.diagnosisForm.value.status;
    this.patientDiagnois.testedOn = this.diagnosisForm.value.testedOn;
    this.patientDiagnois.lab = this.diagnosisForm.value.lab;
  }

  loadCities(){
    this.cityService.getCities().subscribe(
      (data) => {this.cities = data; },
      (err) => err,
      () => console.log('completed')
    );
  }

  loadStates(){
    this.stateService.getStates().subscribe(
      (data) => {this.states = data; },
      (err) => err,
      () => console.log('completed')
    );
  }

  loadLabs(){
    this.labsService.getLabs().subscribe(
      (data) => {this.labs = data; },
      (err) => err,
      () => console.log('completed')
    );
  }

  handleError(err: string): void {
    this.error = err;
    this.isError = true;
    this.logService.error(err);
  }

  reset(): void{
    this.isError = false;
    this.error = '';
  }

  logValidationErrors(group: FormGroup = this.diagnosisForm): void {

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for (const errorkey in abstractControl.errors) {
          if (errorkey) {
            this.formErrors[key] += messages[errorkey] + '';
          }
        }
      }

      // This is child Form group validation as recursive function call
      // if (abstractControl instanceof FormGroup) {
      //  this.logValidationErrors(abstractControl);
      // }

    });
  }

}
