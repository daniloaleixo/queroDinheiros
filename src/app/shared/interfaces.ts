export interface ISummary {
	spendingPerCategories: any;
	totalCredit: number;
	totalDebit: number;
}

export interface IAddSpending {
  tags: string[];
  amount: number;
  description: string;
  date: string;
}

export interface IDatepicker {
	date: {
		year: number;
		month: number;
		day: number;
	};
}

export interface ISettings {
	totalDebit: number;
	totalCredit: number;
	totalInvested: number;
	currentSalary: number;
	percentageSalaryInvested: number;
	surplus: number;
	spendingPerCategories: any;
}
