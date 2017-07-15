import { Injectable } from '@angular/core';

import { IDatepicker } from '../models/interfaces.model';

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

}

