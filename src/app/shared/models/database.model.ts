//
// Não cinsigo tipar o DB pq o hash nao aceita valores paralelos a ele, como
// por exemplo no caso do summary
//

export interface Database {
	snapshot: any;
}

export function createDatabase(): Database {
	const db: Database = {
		snapshot: null
	};
	return db;
}
