import { Component, OnInit } from '@angular/core';

import { appRoutes } from '../../app.routes';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	private routes: Object;
	private currentRoute: string = '';

  	constructor(private route: ActivatedRoute, private router: Router) {

  		console.log(this.route);
  		this.router.events.subscribe((event) => {
  			if(event instanceof NavigationEnd){
  				this.currentRoute = event.url;
		  		this.routes = appRoutes;
		  		this.routes[0]['name'] = 'Adicionar';
		  		this.routes[1]['name'] = 'Gastos';
		  		this.routes[2]['name'] = 'Investimentos';
  			}
  		});
  	}

  	ngOnInit() {
  	}

}
