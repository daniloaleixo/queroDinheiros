export interface Database {
	snapshot: YearSpendings;
}

export function createDatabase(): Database {
	const db: Database = {
		snapshot: null
	};
	return db;
}

export interface YearSpendings {
	[year: string]: MonthSpendings;	
}

export interface MonthSpendings {
	[month: string]: DaySpendings;
}

export interface DaySpendings {
	[day: string]: {
		debts: Array<Spending>;
		investiments: any;
	};
}

export interface Spending {
	amount: number;
	date: string;
	description: string;
	tags: Array<string>;
}
