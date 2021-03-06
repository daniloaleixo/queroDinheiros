import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { DatabaseSnapshotService } from './shared/singletons/database-snapshot.service';

@Component({
  selector: 'app-home',
  template: `<app-header></app-header>
				<router-outlet></router-outlet>`
})

//
// Home component is the root component, app component is above its
//
export class HomeComponent implements OnInit {

  	constructor(private authService: AuthService,
                private dbSnapshot: DatabaseSnapshotService,
                private router: Router) {
  		this.authService.user.subscribe(
  			(auth) => {
          if (!auth) this.router.navigate(['/login']);
  			}
  		);
  	}

  	ngOnInit() {
  	}

}
