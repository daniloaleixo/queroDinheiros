import { YearSpendings } from './spendings.model';

export interface Database {
	spendings: YearSpendings;
}

export function createDatabase(): Database {
	const db: Database = {
		spendings: null
	};
	return db;
}
