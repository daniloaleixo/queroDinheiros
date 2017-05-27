import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';
import { AngularFireAuth, FirebaseAuthStateObservable } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

	public isLogged = new BehaviorSubject<boolean>(false);
	public user: Observable<firebase.User>;
  public uid = new BehaviorSubject<string>(null);

  	constructor(public afAuth: AngularFireAuth) {
  		this.isLogged.publishReplay(1);
  		this.user = afAuth.authState;
      this.user.subscribe((user) => this.uid.next(user.uid));
  	}

  	login(email: string, password: string) {
  		return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  	}

  	loginGoogle() {
  		return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  	}

  	register(email: string, password: string) {
  		return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  	}

  	logout(): void {
  		this.afAuth.auth.signOut();
  	}


}
