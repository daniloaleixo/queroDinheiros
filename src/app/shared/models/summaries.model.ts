

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
	spendingPerCategories?: ISpendingCategorieHash;
}

export interface ISpendingCategorieHash {
	[tag: string]: number;
}

export interface IDatabaseSummary {
	currentDay: ISummary;
	currentMonth: ISummary;
	currentYear: ISummary;
}

export function createDatabaseSummary() {
	const dbSummary: IDatabaseSummary = {
		currentDay: {
			totalDebit: 0,
			totalCredit: 0,
			spendingPerCategories: {}
		},
		currentMonth: {
			totalDebit: 0,
			totalCredit: 0,
			spendingPerCategories: {}
		},
		currentYear: {
			totalDebit: 0,
			totalCredit: 0,
			spendingPerCategories: {}
		}
	}
	return dbSummary;
}