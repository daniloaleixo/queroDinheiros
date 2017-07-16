import { Injectable } from '@angular/core';

import { IDatepicker } from '../models/spendings.model';

@Injectable()
export class UtilsService {


  public aux: Date;
  public todayEndDate: Date;
  public todayStartDate: Date;
  public monthStartDate: Date;
  public yearStartedDate: Date;



  constructor() {

    this.aux = new Date();
    this.todayEndDate = new Date(
    this.aux.getFullYear(), this.aux.getMonth(), this.aux.getDate(), 23, 59, 59);
    this.todayStartDate = new Date(
    this.aux.getFullYear(), this.aux.getMonth(), this.aux.getDate(), 0, 0, 0);
    this.monthStartDate = new Date(this.aux.getFullYear(), this.aux.getMonth(), 1, 0, 0, 0);
    this.yearStartedDate = new Date(this.aux.getFullYear(), 0, 1, 0, 0, 0);
  }

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

  transformDateToDatabaseDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }



}

