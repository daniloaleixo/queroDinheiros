import { Injectable } from '@angular/core';

import { IDatepicker } from '../models/spendings.model';

@Injectable()
export class UtilsService {

  	constructor() {}

  	getCurrentDate(): IDatepicker {
  		const today = new Date();
  		return {
  			date: {
	  			day: today.getDate(),
		  		month: today.getMonth() + 1,
		  		year: today.getFullYear()
  			}
  		};
  	}

    transformCurrency(value: string): number {
      return parseFloat(value.toString().replace(/,/g, '.'));
    }

    transformDatabaseDate(date: string): Date {
      const ddmmyyyy = date.split('-');
      return new Date(Number(ddmmyyyy.pop()), Number(ddmmyyyy.pop()) - 1, Number(ddmmyyyy.pop()));
    }

}

