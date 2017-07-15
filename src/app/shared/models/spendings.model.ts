

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