export interface ISummary {
	spendingPerCategories: Object;
	totalCredit: number;
	totalDebit: number;
}

export interface IAddSpending {
  tags: string[];
  amount: number;
  description: string;
  date: string;
}
