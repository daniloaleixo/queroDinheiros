import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Database, createDatabase } from '../models/database.model';

import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from 'angularfire2/database';


@Injectable()
export class DatabaseSnapshotService {

	public databaseSnapshot: BehaviorSubject<Database>;

  constructor(private auth: AuthService, private db: AngularFireDatabase) {
  	this.databaseSnapshot = new BehaviorSubject<Database>(createDatabase());

  	// I have to wait till user is logged to start
  	this.auth.uid
  		.filter((uid: string) => uid != null)
  		.subscribe((uid: string) => {
  			this.getInitialDatabaseSnapshot(uid);
  		});

  		
  	// Here I'll listen to all modifications to the db and instantly update to server
  	this.databaseSnapshot
  		.filter((db: Database) => db != null && db.snapshot != null)
  		.subscribe((db: Database) => {
  		// console.log('Database', db);
  		// console.log('Entrando', db.snapshot);
  		// console.log('Entrando', db.snapshot['2017']);
  		// console.log('Entrando', db.snapshot['2017']['5']);
  		// console.log('Entrando', db.snapshot['2017']['5']['2']);
  		// console.log('Entrando', db.snapshot['2017']['5']['2'].debts);
  		// console.log('Entrando', db.snapshot['2017']['5']['2'].debts[0]);
  	});

  }

  // Get the snapshot from server and puts in the stream as an Database Object
  private getInitialDatabaseSnapshot(uid: string) {
  	this.db.object(uid, { preserveSnapshot: true }).$ref
  		.once('value', (snapshot) => {
  			const mySnapshot: Database = {
  				snapshot: snapshot.val()
  			};
  			this.databaseSnapshot.next(mySnapshot);
  		});

  }

}
