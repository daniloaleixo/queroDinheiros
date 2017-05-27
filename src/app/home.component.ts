import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `<app-header></app-header>
				<router-outlet></router-outlet>`
})
export class HomeComponent implements OnInit {

  	constructor() { }

  	ngOnInit() {
  	}

}
