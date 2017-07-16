import { Injectable } from '@angular/core';
import { IAddSpending } from '../models/spendings.model';
import { ISummary } from '../models/summaries.model';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { UtilsService } from './utils.service';

import { Database } from '../models/database.model';
import { Spending } from '../models/spendings.model';

@Injectable()
export class BackgroundTasksService {

    constructor(private db: AngularFireDatabase,
                private utils: UtilsService) { }

    // The function will get all the spending in a gigantic array which will be sorted
    // (This function is really ugly, looks like spaghetti function)
    getSpendingArray(db: Database): Array<Spending> {

      const spendingArray: Array<Spending> = [];

      if (db.snapshot) {
        // Loop through each year
        Object.keys(db.snapshot)
        .filter(year => db.snapshot[year] && year !== 'summary')
        .forEach((year: string) => {
          // Loop thourh each month
          Object.keys(db.snapshot[year])
          .filter(month => db.snapshot[year][month] && month !== 'summary')
          .forEach((month: string) => {
            // Loop through each day
            Object.keys(db.snapshot[year][month])
            .filter(day => db.snapshot[year][month][day] && day !== 'summary'
               && db.snapshot[year][month][day].debts)
            .forEach((day: string) => {
              // Loop through each debt
              Object.keys(db.snapshot[year][month][day].debts)
              .forEach((debt: string) => {
                spendingArray.push(db.snapshot[year][month][day].debts[debt]);
              });
            });
          });
        });
      }
      return spendingArray;
    }


    calculateSpendingOfPeriod(from: Date, to: Date, spendingArray: Spending[]): ISummary {
      let summary: ISummary = {
        totalDebit: 0,
        totalCredit: 0,
        spendingPerCategories: {}
      };
      if (spendingArray) {
        spendingArray.forEach((spending: Spending) => {
          let myDate: Date;
          if (spending.date) myDate = this.utils.transformDatabaseDate(spending.date);

          if (myDate && myDate >= from && myDate <= to) {
            // Check if is a debit (> 0) or credit (<0)
            if (spending.amount > 0) summary.totalDebit += spending.amount;
            else summary.totalCredit += spending.amount;

            // Add amount to each tag
            if (spending.tags) {
              spending.tags.forEach((tag: string) => {
                if (summary.spendingPerCategories[tag])
                  summary.spendingPerCategories[tag] += spending.amount;
                else
                  summary.spendingPerCategories[tag] = spending.amount; 
              });
            }
          }
        });
      }
      console.log('toaqui', summary, from, to, spendingArray.length);

      return summary;
    }

    // To BE REMOVED
    // Once we have the whole db on the client will have to just update
    // the database snapshot and it automatically update de db itself
    // I will take this out because these function is designed wrong
    // And we will no longer make these calls to db, will have on snapshot
    public updateSummary(uid: string, year: string,  month: string,
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

    // TO BE REMOVED

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


}
