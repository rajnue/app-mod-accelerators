import { Component, OnInit } from '@angular/core';
import { LabService } from '../services/lab.service';
import { ILab} from '../model/lab.model';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { LogService} from '../../../core/log-services/log.service';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { LoadLabAction, RemoveLabAction } from '../store/lab.actions';

@Component({
  selector: 'app-list-lab',
  templateUrl: './list-lab.component.html',
  styleUrls: ['./list-lab.component.scss']
})
export class ListLabComponent implements OnInit {
  labs: ILab[] = [];
  lab: ILab;
  error: string;
  isError = false;
  columns: any[];


  // labstore$: Observable<ILab[]>;

  labstore$: Observable<Array<ILab>>;
  loading$: Observable<Boolean>;
  error$: Observable<string>;

  constructor(private labservice: LabService,
              private router: Router,
              private logService: LogService,
              private store: Store<AppState>) {
                // this.labstore$ = store.pipe(select('labs'));
              }


  ngOnInit(): void {
    this.getColumns();
    this.dataLoad();
  }

  dataLoad(){

    this.labstore$ = this.store.select(store => store.labs.labs);
    this.loading$ = this.store.select(store => store.labs.loading);
    this.error$ = this.store.select(store => store.labs.error);

    this.store.dispatch(new LoadLabAction());

    this.labstore$.subscribe(data => this.labs = data);
    this.error$.subscribe( (err) => { if (err) { this.handleError(err); }  });

  }

  handleError(err: string): void {
    this.error = err;
    this.isError = true;
    this.logService.error(err);
  }

  getColumns(){
    this.columns = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Lab' },
      { field: 'licensecode', header: 'License-Id' },
      { field: 'city', header: 'City' },
      { field: 'state', header: 'State'},
      { field: '', header: 'Action'}
    ];
  }

  public editLab(id: number): void {
    this.router.navigate(['/admin/editLab', id]);
  }

  public deleteLab(id: number): void{
    this.store.dispatch(new RemoveLabAction(id));
    this.error$.subscribe( (err) => { if (err) {
      this.handleError(err); console.log(err); }
    });
    this.dataLoad();
    /*
    this.labservice.deleteLab(id).subscribe(
      ()=> this.dataLoad(),
      (err)=>this.handleError(err),
      ()=>{
        this.router.navigate(['/admin/labs']);
        console.log("Record deleted!");
      }
   );
   */
  }



}
