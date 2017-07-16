

export interface YearSpendings {
	[year: string]: MonthSpendings;
}

export interface MonthSpendings {
	[month: string]: DaySpendings;
}

export interface DaySpendings {
	[day: string]: {
		debts: Array<Spending>;
	};
}

export interface Spending {
	amount: number;
	date: string;
	description: string;
	tags: Array<string>;
}

export interface IInputAddSpending {
  tags: string;
  amount: string;
  description: string;
  date: IDatepicker;
}

export interface IDatepicker {
	date: {
		year: number;
		month: number;
		day: number;
	};
}
