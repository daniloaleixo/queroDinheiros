import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

import { AuthService } from '../../auth/auth.service';
import { BackgroundTasksService } from '../services/background-tasks.service';
import { Database, createDatabase } from '../models/database.model';
import { Spending } from '../models/spendings.model';

import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from 'angularfire2/database';


@Injectable()
export class DatabaseSnapshotService {

	public databaseSnapshot: BehaviorSubject<any>;
	public spendingArrayHistory: BehaviorSubject<Array<Spending>>;

  constructor(private auth: AuthService,
  						private db: AngularFireDatabase,
  						private backgroundTasks: BackgroundTasksService) {
  	this.databaseSnapshot = new BehaviorSubject<any>(createDatabase());
  	this.databaseSnapshot.publishReplay(1);

  	this.spendingArrayHistory = new BehaviorSubject([]);
  	this.spendingArrayHistory.publishReplay(1);

  	// I have to wait till user is logged to start
  	this.auth.uid
  		.filter((uid: string) => uid != null)
  		.subscribe((uid: string) => {
  			this.getInitialDatabaseSnapshot(uid);
  		});

  	// Here I'll listen to all modifications to the db and instantly update to server
  	this.databaseSnapshot
  		.filter((snapshot) => snapshot != null && snapshot.snapshot != null)
  		.subscribe((snapshot: Database) => {
  		// console.log('Database', snapshot);
  		console.log('Entrando', snapshot.snapshot);
  		// console.log('Entrando', snapshot.snapshot['2017']);
  		// console.log('Entrando', snapshot.snapshot['2017']['5']);
  		// console.log('Entrando', snapshot.snapshot['2017']['5']['2']);
  		// console.log('Entrando', snapshot.snapshot['2017']['5']['2'].debts);
  		// console.log('Entrando', snapshot.snapshot['2017']['5']['2'].debts[0]);
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
  			// Make spending array
  			this.spendingArrayHistory.next(this.backgroundTasks
  					.getSpendingArray(mySnapshot).reverse());
  		});

  }

}
