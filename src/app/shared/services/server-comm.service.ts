import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { IDatepicker } from '../interfaces';
import { UtilsService } from './utils.service';
import { AuthService } from '../../auth/auth.service';
import { LayoutService } from '../layout/layout.service';
import { Observable } from 'rxjs';

@Injectable()
export class ServerCommService {

	private object: FirebaseObjectObservable<any>;

	private dateObject: IDatepicker;

  	constructor(private db: AngularFireDatabase,
                private layout: LayoutService,
                private auth: AuthService,
        				private utils: UtilsService) {
  		this.dateObject =  this.utils.getCurrentDate();
  	}

  	updateSalary(salary: number): Observable<any> {
      let returnValue: Observable<any> = null;
      this.db
  			.object(`/${this.auth.uid}
  					/${this.dateObject.date.year}
  					/${this.dateObject.date.month}
  					/summary
  					/currentSalary`)
  			.set(salary)
        .then((res) => {
          returnValue = Observable.of(res);
          this.layout.turnOffLoading();
        })
        .catch(error => {
          returnValue = Observable.of(error);
          this.layout.turnOffLoading();
        });

      return returnValue;
  	}

}
