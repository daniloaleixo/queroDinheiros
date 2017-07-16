

// export interface YearSummary {
// 	[year: string]: MonthSummary;
// }

// export interface MonthSummary {
// 	[month: string]: DaySummary;
// }

// export interface DaySummary {
// 	[day: string]: any
// 	};
// }


export interface ISummary {
	totalDebit?: number;
	totalCredit?: number;
	totalInvested?: number;
	currentSalary?: number;
	percentageSalaryInvested?: number;
	surplus?: number;
	spendingPerCategories?: any;
}

export interface ISpendingCategorie {
	[tag: string]: number;
}
