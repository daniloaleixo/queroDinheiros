import { Injectable } from '@angular/core';
import { IAddSpending } from './add-spending/add-spending.component';

@Injectable()
export class BackgroundTasksService {

  	constructor() { }

  	public updateSummary(uid: string, year: string,
  					month: string, day: string, speding: IAddSpending): void {
  		console.log('bla');
  	}

}
