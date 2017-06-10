import { Injectable } from '@angular/core';

import { IDatepicker } from '../interfaces';

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

}

