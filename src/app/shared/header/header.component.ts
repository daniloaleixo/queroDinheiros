import { Component, OnInit } from '@angular/core';

import {Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	private currentRoute: string = '';

  	constructor(private router: Router, public authService: AuthService) {

  		this.router.events.subscribe((event) => {
        console.log(event);
  			if(event instanceof NavigationEnd){
  				this.currentRoute = event.url;
  			}
  		}); 

  	}

  	ngOnInit() {
  	}

}

  
