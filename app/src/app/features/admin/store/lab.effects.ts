import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


import { LabService } from '../services/lab.service';
import { LabActionTypes, LoadLabAction, LoadLabSuccessAction, LoadLabFailureAction, AddLabAction, AddLabSuccessAction, AddLabFailureAction, RemoveLabAction, RemoveLabSuccessAction, RemoveLabFailureAction } from './lab.actions';


@Injectable()
export class LabEffects {

    constructor( private actions$: Actions, private labService: LabService) { }

      @Effect() loadlabs$ = this.actions$
      .pipe(
        ofType<LoadLabAction>(LabActionTypes.LOAD_LAB),
        mergeMap(
          () => this.labService.getLabs()
            .pipe(
              map(data => {
                return new LoadLabSuccessAction(data);
              }),
              catchError(error => of(new LoadLabFailureAction(error)))
            )
        ),
     );

     @Effect() addLab$ = this.actions$
        .pipe(
        ofType<AddLabAction>(LabActionTypes.ADD_LAB),
        mergeMap(
            (data) => this.labService.addLab(data.payload)
            .pipe(
                map(() => new AddLabSuccessAction(data.payload)),
                catchError(error => of(new AddLabFailureAction(error)))
            )
        )
    );

  @Effect() removelab$ = this.actions$
    .pipe(
      ofType<RemoveLabAction>(LabActionTypes.REMOVE_LAB),
      mergeMap(
        (data) => this.labService.deleteLab(data.payload)
          .pipe(
            map(() => new RemoveLabSuccessAction(data.payload)),
            catchError((error) => of(new RemoveLabFailureAction(error)))
          )
      )
    );

}
