import { Injectable } from '@angular/core';

import { IDatepicker } from '../shared/models/interfaces.model';

@Injectable()
export class SpendingsService {

  constructor() { }

  validateTags(tags): string[] {
    const tagsArray = tags.split(' ').filter(tag => tag.length > 0);
    if (tagsArray.length > 1) return tagsArray;
    else if (tagsArray.length === 1) return [tagsArray];
    return [];
  }

  validateAmount(amount: string): number {
    return parseFloat(amount.toString().replace(/,/g, '.'));
  }

  validateDescription(description): string {
      if (description.length === 0) return 'null';
      return description;
  }

  validateDate(date: IDatepicker): string {
   const day = this.getDay(date);
   const month = this.getMonth(date);
   const year = this.getYear(date);

   return day + '-' + month + '-' + year;
  }

  getDay(date: IDatepicker): string {
  	return date.date.day.toString();
  }

  getMonth(date: IDatepicker): string {
  	return date.date.month.toString();
  }

  getYear(date: IDatepicker): string {
  	return date.date.year.toString();
  }

}
