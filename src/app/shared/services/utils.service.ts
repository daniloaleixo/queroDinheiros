import { Injectable } from '@angular/core';


export interface IDatepicker {
	date: {
		year: number,
		month: number,
		day: number
	};
}

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

