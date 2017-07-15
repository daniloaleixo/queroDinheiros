import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';

import { ParentComponent } from '../../shared/models/parent-component.model';

declare var Materialize: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends ParentComponent implements OnInit {

	registerMode: boolean;

	formData = {
		email: '',
		password: '',
		password2: ''
	};

  constructor(private authService: AuthService, private router: Router) {
     super();
    this.registerMode = false;
    this.showLoading = false;
  }

	ngOnInit() {
	}

	login(): void {
    this.showLoading = true;
		this.authService.login(this.formData.email, this.formData.password).then(
			(bla: firebase.User) => {
				this.router.navigate(['/']);
			},
			(error: Error) => {
        this.showLoading = false;
				Materialize.toast(error.message, 4000, 'center');
			}
		);
	}

	register(): void {
    this.showLoading = true;
		this.authService.register(this.formData.email, this.formData.password)
			.then((res) => this.authService.login(this.formData.email, this.formData.password))
			.catch((error: Error) => {
				Materialize.toast(error.message, 4000, 'center');
			});
	}

	loginGoogle(): void {
    this.showLoading = true;
		this.authService.loginGoogle().then(
			(bla: firebase.User) => {
				this.router.navigate(['/']);
			},
			(error: Error) => {
        this.showLoading = false;
				Materialize.toast(error.message, 4000, 'center');
			}
		);
	}

}
