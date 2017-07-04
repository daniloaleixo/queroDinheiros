export interface Database {
	[year: number]: Array<MonthSpendings>;
}

export interface MonthSpendings {
	[month: number]: Array<DaySpendings>;
}

export interface DaySpendings {
	[day: number]: {
		debts: Array<Spending>;
		investiments: any;
	};
}

export interface Spending {
	[key: string]: {
		amount: number;
		date: string;
		description: string;
		tags: Array<string>;
	};
}
