import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LabService } from '../services/lab.service';
import { ILab } from '../model/lab.model';
import { Router} from '@angular/router';
import { LogService} from '../../../core/log-services/log.service';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.state';
// import { AddLab } from '../store/lab.actions';
import { CityService } from '../../../shared/services/cities.service';
import { IMaster } from '../../../shared/models/master.model';
import { StateService } from '../../../shared/services/states.service';
import { AddLabAction, AddLabSuccessAction, AddLabFailureAction } from '../store/lab.actions';

@Component({
  selector: 'app-create-lab',
  templateUrl: './create-lab.component.html',
  styleUrls: ['./create-lab.component.scss']
})
export class CreateLabComponent implements OnInit, OnDestroy {

  labForm: FormGroup;
  lab: ILab;
  error: string;
  isError = false;
  pageLabel: string ;
  cities: IMaster[];
  states: IMaster[];
  state: IMaster;
  city: IMaster;
  labstore$: Observable<ILab[]>;
  message: string;
  ifSuccess = false;
  loading$: Observable<Boolean>;
  error$: Observable<string>;
  private _subscription: Subscription;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private labService: LabService,
              private router: Router,
              private logService: LogService,
              private cityService: CityService,
              private stateService: StateService,
              private store: Store<AppState>) {
                console.log('called constructor. ');
                // this.labstore$ = store.pipe(select('labs'));

              }

  validationMessages = {
    name: {
      required: 'Name is required.',
      minlength: 'Name must be greater then 2 characters.',
      maxlength: 'Name must be less then 10 characters.'
    },
    licensecode: {
      required: 'License Code is required.',
      minlength: 'License Code must be greater then 5 characters.',
      maxlength: 'License Code must be less then 10 characters.'
    },
    city: {
      required: 'City is required.',
      minlength: 'City must be greater then 2 characters.',
      maxlength: 'City must be less then 20 characters.'
    },
    state: {
      required: 'State is required.',
      minlength: 'State must be greater then 2 characters.',
      maxlength: 'State must be less then 20 characters.'
    }
  };

  formErrors = {
    name: '',
    licensecode: '',
    city : '',
    state : ''
  };

  ngOnInit(): void {
    console.log('called ngOnInit. ');

    this.loadCities();
    this.loadStates();

    this.loading$ = this.store.select(store => store.labs.loading);
    this.error$ = this.store.select(store => store.labs.error);

    this.labForm = this.fb.group({
      name: ['', Validators.required],
      licensecode: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
    });

    this.labForm.valueChanges.subscribe(value => {
      this.logValidationErrors(this.labForm);
    });

    this.route.paramMap.subscribe(params => {
      const labid = + params.get('id');
      if (labid) {
        this.getLab(labid);
        this.pageLabel = 'Edit Lab';
      }
      else{
        this.lab = {
          id: null,
          name: '',
          licensecode: '',
          city : '',
          state: ''
        };
        this.pageLabel = 'New Lab';
      }
    });
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

  getLab(id: number) {
    this.labService.getLab(id).subscribe(
      (lab: ILab) => {
                        this.editLab(lab);
                        this.lab = lab;
                      },
      (err: any) => console.log(err)
    );
  }

  editLab(lab: ILab) {
    this.labForm.patchValue({
      name: lab.name,
      licensecode: lab.licensecode,
      city: lab.city,
      state: lab.state
    });
  }

  onSubmit(): void {

    // stop here if form is invalid
    if (this.labForm.invalid) {
      return;
    }

    this.mapFormValueToLabModel();

    if (this.lab.id){
      this._subscription = this.labService.updateLab(this.lab)
          .subscribe(
            () => {this.message = 'Successfully Updated.'; this.ifSuccess = true; },
            (err) => (err) => this.handleError(err)
            );
    }
    else{
      this.store.dispatch(new AddLabAction(this.lab));
      this._subscription = this.loading$.subscribe(data => {
        if (!data) {
          this.message = 'Successfully Insterted.';
          this.ifSuccess = true;
        }
      });

      this.error$.subscribe( (err) => { if (err) { this.handleError(err); } });

      /*
      this.labService.addLab(this.lab)
          .subscribe(
          ()=>{
            this.successmessage="Successfully Insterted.";
          },
          (err)=>this.handleError(err),
          () => console.log("Save process completed")
          );
      */
    }
  }

  handleError(err: string): void {
    this.error = err;
    this.isError = true;
    this.logService.error(err);
  }

  mapFormValueToLabModel(): void {
    console.log(this.lab.name);
    console.log(this.labForm.value.name);
    this.lab.name = this.labForm.value.name;
    this.lab.licensecode = this.labForm.value.licensecode.toString();
    this.lab.city = this.labForm.value.city;
    this.lab.state = this.labForm.value.state;
  }

  LoadData(): void {
    this.labForm.setValue({
      name: 'raj',
      licensecode: '123QW44',
      city : 'Panji',
      state : 'GOA'
    });
  }

  reset(): void{
    this.isError = false;
    this.error = '';
  }

  ngOnDestroy(): void{
    this._subscription.unsubscribe();
  }

  logValidationErrors(group: FormGroup = this.labForm): void {
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

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

    });
  }

}
