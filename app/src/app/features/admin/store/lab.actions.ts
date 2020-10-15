import { Injectable } from '@angular/core';
import { Action} from '@ngrx/store';
import { ILab } from '../model/lab.model';


export enum LabActionTypes {
    LOAD_LAB = '[LAB] Load Lab',
    LOAD_LAB_SUCCESS = '[LAB] Load Lab Success',
    LOAD_LAB_FAILURE = '[LAB] Load Lab Failure',
    ADD_LAB = '[LAB] Add Lab',
    ADD_LAB_SUCCESS = '[LAB] Add Item Success',
    ADD_LAB_FAILURE = '[LAB] Add Item Failure',
    REMOVE_LAB = '[LAB] Delete Lab',
    REMOVE_LAB_SUCCESS = '[LAB] Delete Item Success',
    REMOVE_LAB_FAILURE = '[LAB] Delete Item Failure'
}

export class LoadLabAction implements Action{
    readonly type = LabActionTypes.LOAD_LAB;
}

export class LoadLabSuccessAction implements Action {
    readonly type = LabActionTypes.LOAD_LAB_SUCCESS;

    constructor(public payload: Array<ILab>){}
}

export class LoadLabFailureAction implements Action{
    readonly type = LabActionTypes.LOAD_LAB_FAILURE;

    constructor(public payload: string){}
}

export class AddLabAction implements Action{
    readonly type = LabActionTypes.ADD_LAB;

    constructor(public payload: ILab){}
}

export class AddLabSuccessAction implements Action{
    readonly type = LabActionTypes.ADD_LAB_SUCCESS;

    constructor(public payload: ILab){}
}

export class AddLabFailureAction implements Action{
    readonly type = LabActionTypes.ADD_LAB_FAILURE;

    constructor(public payload: string){}
}

export class RemoveLabAction implements Action {
    readonly type = LabActionTypes.REMOVE_LAB;

    constructor(public payload: number) { }
  }

export class RemoveLabSuccessAction implements Action {
    readonly type = LabActionTypes.REMOVE_LAB_SUCCESS;

    constructor(public payload: number) { }
  }
export class RemoveLabFailureAction implements Action {
    readonly type = LabActionTypes.REMOVE_LAB_FAILURE;

    constructor(public payload: string) { }
  }

export type LabAction =   LoadLabAction| LoadLabSuccessAction |LoadLabFailureAction|
                            AddLabAction| AddLabSuccessAction |AddLabFailureAction |
                            RemoveLabAction |RemoveLabSuccessAction |RemoveLabFailureAction;


