import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Patient Diagnosis Tracker';
  constructor(private router: Router){}

  ngOnInit(): void{
    // if(login==null)
      this.router.navigate(['/access/login']);
  }

}
