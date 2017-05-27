import { Injectable } from '@angular/core';
import { IAddSpending } from './add-spending/add-spending.component';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class BackgroundTasksService {

  	constructor(private db: AngularFireDatabase) { }

  	public updateSummary(uid: string, year: string,
  					month: string, day: string, speding: IAddSpending): void {
  		const item = this.db.object(`${uid}/${year}/${month}/${day}/summary`, 
  			{ preserveSnapshot: true });
  		item.subscribe(snapshot => {
  		  console.log(snapshot.key)
  		  console.log(snapshot.val())
  		});
  	}

}
