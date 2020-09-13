import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit, OnChanges {
  @Input() error: any;

  constructor() {}

  @Input() inputdata: string;
  ngOnChanges(changes: SimpleChanges) {
    console.log('called ngOnChanges.');
  }

  ngOnInit(): void {}
}
