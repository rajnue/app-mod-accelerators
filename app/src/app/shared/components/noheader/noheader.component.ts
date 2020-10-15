import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-noheader',
  templateUrl: './noheader.component.html',
  styleUrls: ['./noheader.component.scss'],
})
export class NoheaderComponent implements OnInit {
  environmentName: string = environment.name;

  constructor() {}

  ngOnInit(): void {}
}
