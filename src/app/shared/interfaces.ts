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
