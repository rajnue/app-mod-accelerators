import { Injectable  } from '@angular/core';
import { LabService } from '../services/lab.service';
import { ILab } from 'src/app/features/admin/model/lab.model';
import { Observable } from 'rxjs';


@Injectable()
export class LabFacade {
    labs:ILab[] =[];
    lab: ILab;
    constructor(private labservice:LabService){ }

    loadLabs(){
      return this.labservice.getLabs()
         .subscribe(data => this.labs = data,
          (err)=>err);
    }
}