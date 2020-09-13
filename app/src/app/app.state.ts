import { ILab } from './features/admin/model/lab.model';
import { LabState } from './features/admin/store/lab.reducers';

export interface AppState{
    // readonly labs : ILab[];
    readonly labs: LabState;
}
