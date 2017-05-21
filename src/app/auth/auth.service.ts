import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

	public isLogged = new BehaviorSubject<boolean>(true);

  	constructor() {
  		this.isLogged.publishReplay(1);
  	}

}
