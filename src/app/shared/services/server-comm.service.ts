import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database';

import { IDatepicker, Spending, IInputAddSpending } from '../models/spendings.model';
import { ISummary } from '../models/summaries.model';
import { UtilsService } from './utils.service';
import { AuthService } from '../../auth/auth.service';
import { LayoutService } from '../singletons/layout.service';
import { SpendingsService } from '../../spendings/spendings.service';
import { BackgroundTasksService } from './background-tasks.service';
// These should not be here I have to take this out after refactoring addSpending
import { DatabaseSnapshotService } from '../singletons/database-snapshot.service';



import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ServerCommService {

  private object: FirebaseObjectObservable<any>;

  private dateObject: IDatepicker;

  constructor(private db: AngularFireDatabase,
              private layout: LayoutService,
              private auth: AuthService,
              private dbSnapshots: DatabaseSnapshotService,
              private backgroundTasksService: BackgroundTasksService,
              private spendingsService: SpendingsService,
              private utils: UtilsService) {
    this.dateObject =  this.utils.getCurrentDate();
  }

  updateSalary(salary: number): Observable<any> {
    this.layout.turnOnLoading();

    let returnValue: Observable<any> = Observable.of(null);
    this.auth.uid.subscribe(uid => {
      if (uid) {
        const route =
          `${uid}/${this.dateObject.date.year}/${this.dateObject.date.month}/summary`;
        console.log('route', route);

        this.db
    			.object(route)
    			.update({ currentSalary: salary })
          .then((res) => {
            returnValue = Observable.of(res);
            this.layout.turnOffLoading();
          })
          .catch(error => {
            returnValue = Observable.of(error);
            this.layout.turnOffLoading();
          });
      }
    });

    return returnValue;
	}


  addSpending(formData: IInputAddSpending): Promise<string> {

    return new Promise((resolve, reject) => {

      const sendData: Spending = {
        tags: this.spendingsService.validateTags(formData.tags),
        amount: this.spendingsService.validateAmount(formData.amount),
        description: this.spendingsService.validateDescription(formData.description),
        date: this.spendingsService.validateDate(formData.date)
      };

      // These should not be here
      this.dbSnapshots.addSpending(sendData);


      console.log('enviar pro server', sendData);
      // Wait to system to login and then get the database
      this.auth.uid.subscribe((uid: string) => {
        // First I have to get all the objects from server that I will need
        //  And I need the summary of the day, month and year
        // To add the new value to those infos
        if (uid) {
          const year = this.spendingsService.getYear(formData.date);
          const month = this.spendingsService.getMonth(formData.date);
          const day = this.spendingsService.getDay(formData.date);

          this.db.list(`${uid}/${year}/${month}/${day}/debts/`)
          .push(sendData).then(
            (res) => {
              // This backgroung service will sum the value in all
              // summaries (day, month and year) and update the new info
              this.backgroundTasksService
                .updateSummary(uid, year, month, day, sendData.amount, sendData.tags);
              resolve('Gasto salvo com sucesso');
            },
            (error: Error) => reject(Error('Erro ao salvar gasto')));
        } else reject(Error('Erro ao salvar gasto'));
      });
    });
  }

}
