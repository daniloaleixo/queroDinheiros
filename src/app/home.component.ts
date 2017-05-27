import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-home',
  template: `<app-header></app-header>
				<router-outlet></router-outlet>`
})
export class HomeComponent implements OnInit {

  	constructor(private authService: AuthService, private router: Router) {
  		this.authService.user.subscribe(
  			(auth) => {
          if (!auth) this.router.navigate(['/login']);
  			}
  		);
  	}

  	ngOnInit() {
  	}

}
