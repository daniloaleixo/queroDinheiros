import { Injectable } from '@angular/core';
import { IAddSpending, ISummary } from '../models/interfaces.model';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Database, YearSpendings } from '../models/database.model';

@Injectable()
export class BackgroundTasksService {

  	constructor(private db: AngularFireDatabase) { }

    // DEPRECATED 
  	public updateSummary(uid: string, year: string,	month: string,
  						day: string, amount: number, tags: string[]): void {

  		// First sum the value to daily summary
  		const daySummaryRef = this.db.object(`${uid}/${year}/${month}/${day}/summary`, { preserveSnapshot: true });
  		daySummaryRef.$ref.once('value', (snapshot) => {
  			daySummaryRef.set(this.createObjectToUpdate(snapshot, amount, tags));
  		});

  		const monthSummaryRef = this.db.object(`${uid}/${year}/${month}/summary`, { preserveSnapshot: true });
  		monthSummaryRef.$ref.once('value', (snapshot) => {
  			monthSummaryRef.set(this.createObjectToUpdate(snapshot, amount, tags));
  		});

  		const yearSummaryRef = this.db.object(`${uid}/${year}/summary`, { preserveSnapshot: true });
  		yearSummaryRef.$ref.once('value', (snapshot) => {
  			yearSummaryRef.set(this.createObjectToUpdate(snapshot, amount, tags));
  		});
  	}

    // DEPRECATED 

  	// Sum all the info to summary and return it to be updated
  	private createObjectToUpdate(snapshot, amount: number, tags: string[]): ISummary {

  		console.log('snapshot', snapshot.val());

	  	const dayInfo = this.checkFields(snapshot);

	  	// If it is debit we add to debit total
	  	if (amount > 0) {
	  		// Include in the total debit
	  		dayInfo.totalDebit += amount;
	  		// Include in the total for each tag
	  		tags.forEach((tag) => {
	  			if (!dayInfo['spendingPerCategories'])
	  				dayInfo['spendingPerCategories'] = { tag: amount };
	  			else if (dayInfo['spendingPerCategories'].tag)
	  				dayInfo['spendingPerCategories'].tag += amount;
	  			else dayInfo['spendingPerCategories'].tag = amount;
	  		});
	  	} else {
	  		// Include in the total credit
	  		dayInfo.totalCredit += + amount;
	  	}
  		return dayInfo;
  	}

  	checkFields(snapshot): ISummary {
  		let info: ISummary;

  		if (snapshot.val()) {
  			info = snapshot.val();
  			if (!info.spendingPerCategories) info.spendingPerCategories = {};
  			if (!info.totalCredit) info.totalCredit = 0;
  			if (!info.totalDebit) info.totalDebit = 0;
  		} else
	  		info = { spendingPerCategories: {}, totalCredit: 0, totalDebit: 0 };

  		return info;
  	}

    updateSpendingSummaries(db: Database): void {
      if(db.spendings) {
        if(Object.keys(db.spendings)) {
          Object.keys(db.spendings).forEach(year => {
            let yearSpending = 0;
          });
         }
      }
    }

}
