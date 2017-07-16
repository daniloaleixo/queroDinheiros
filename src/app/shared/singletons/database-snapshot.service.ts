import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

import { AuthService } from '../../auth/auth.service';
import { BackgroundTasksService } from '../services/background-tasks.service';
import { UtilsService } from '../services/utils.service';

import { Database, createDatabase } from '../models/database.model';
import { Spending } from '../models/spendings.model';
import { IDatabaseSummary, createDatabaseSummary } from '../models/summaries.model';

import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from 'angularfire2/database';


@Injectable()
export class DatabaseSnapshotService {

	public databaseSnapshot: BehaviorSubject<any>;
	public spendingArrayHistory: BehaviorSubject<Array<Spending>>;
  public databaseSummary: BehaviorSubject<IDatabaseSummary>;

  constructor(private auth: AuthService,
  						private db: AngularFireDatabase,
              private utils: UtilsService,
  						private backgroundTasks: BackgroundTasksService) {
  	this.databaseSnapshot = new BehaviorSubject<any>(createDatabase());
  	this.databaseSnapshot.publishReplay(1);
  	this.spendingArrayHistory = new BehaviorSubject<Array<Spending>>([]);
  	this.spendingArrayHistory.publishReplay(1);
    this.databaseSummary = new BehaviorSubject<IDatabaseSummary>(createDatabaseSummary());
    this.databaseSummary.publishReplay(1);

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
        // Recalculate spending array
        this.spendingArrayHistory.next(this.backgroundTasks
          .getSpendingArray(snapshot).reverse());

      console.log('PEgando database snapshot', snapshot.snapshot);
  	});

    // Listening to spendingArrayHistory, any change and I have to update the summary
    this.spendingArrayHistory
      .filter((array) => array != null && array.length > 0)
      .subscribe((array: Spending[]) => {
        const newSummary: IDatabaseSummary = {
          currentDay: this.backgroundTasks.calculateSpendingOfPeriod(
                this.utils.todayStartDate, this.utils.todayEndDate, array),
          currentMonth: this.backgroundTasks.calculateSpendingOfPeriod(
                this.utils.monthStartDate, this.utils.todayEndDate, array),
          currentYear: this.backgroundTasks.calculateSpendingOfPeriod(
                this.utils.yearStartedDate, this.utils.todayEndDate, array)
        };
        console.log('newSummaru', newSummary);
        this.databaseSummary.next(newSummary);
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

  public addSpending(spending: Spending) {
    const array: Spending[] = this.spendingArrayHistory.getValue();
    array.unshift(spending);
    this.spendingArrayHistory.next(array);
  }

}
