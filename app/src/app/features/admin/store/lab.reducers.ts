import {Action } from '@ngrx/store';
import * as LabActions from './lab.actions';
import { ILab } from 'src/app/features/admin/model/lab.model';
import { LabActionTypes } from './lab.actions';


export interface LabState{
  labs: ILab[];
  loading: boolean;
  error: string;
}

const initialState: LabState = {
  labs: [],
  loading: false,
  error: undefined
};

export function LabReducer(state: LabState = initialState, action: LabActions.LabAction){
  switch (action.type){
      case LabActionTypes.LOAD_LAB:
          return {...state,
                  loading: true
                };
      case LabActionTypes.LOAD_LAB_SUCCESS:
            return {
              ...state,
              labs: action.payload,
              loading: false
            };
      case LabActionTypes.LOAD_LAB_FAILURE:
            return {
              ...state,
              error: action.payload,
              loading: false
            };

      case LabActionTypes.ADD_LAB:
         return {...state, loading: true};
      case LabActionTypes.ADD_LAB_SUCCESS:
            return {
                  ...state,
                  lab: [...state.labs, action.payload],
                  loading: false
                };
      case LabActionTypes.ADD_LAB_FAILURE:
              return {
                        ...state,
                        error: [...state.labs, action.payload],
                        loading: false
                      };


      case LabActionTypes.REMOVE_LAB:
                return {
                  ...state,
                  loading: true
                };

      case LabActionTypes.REMOVE_LAB_SUCCESS:
                return {
                  ...state,
                  lab: state.labs.filter(lab => lab.id !== action.payload),
                  loading: false
                };
      case LabActionTypes.REMOVE_LAB_FAILURE:
                return {
                  ...state,
                  error: action.payload,
                  loading: false
                };

         default :
            return state;
  }
}
