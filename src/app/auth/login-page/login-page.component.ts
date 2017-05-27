import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

	registerMode: boolean = false;

	formData = {
		email: '',
		password: '',
		password2: ''
	}

  	constructor() { }

  	ngOnInit() {
  	}

  	login(): void {
  		console.log('logar');
  	}

  	register(): void {
  		console.log('logar');
  	}

  	loginGoogle(): void {
  		console.log('logar');
  	}

}
