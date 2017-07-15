

export interface YearSummary {
	[year: string]: MonthSummary;
}

export interface MonthSummary {
	[month: string]: DaySummary;
}

export interface DaySummary {
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
