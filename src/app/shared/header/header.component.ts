import { Component, OnInit } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	  currentRoute: string;

  	constructor(private router: Router) {
      this.currentRoute = '';

  		this.router.events.subscribe((event) => {
  		  if (event instanceof NavigationEnd) {
  				this.currentRoute = event.url;
  			}
  		});

  	}

  	ngOnInit() {
  	}

}

