import { Component, OnInit } from '@angular/core';

import { LayoutService } from '../../shared/singletons/layout.service';
import { DatabaseSnapshotService } from '../../shared/singletons/database-snapshot.service';
import { UtilsService } from '../../shared/services/utils.service';

import { Database } from '../../shared/models/database.model';
import { IDatabaseSummary } from '../../shared/models/summaries.model';

@Component({
  selector: 'app-view-spendings',
  templateUrl: './view-spendings.component.html',
  styleUrls: ['./view-spendings.component.scss']
})
export class ViewSpendingsComponent implements OnInit {

	public databaseSummary: IDatabaseSummary;
	public currentSalary: number;
	public hasLeft: number;



	constructor(private layout: LayoutService,
							private utils: UtilsService, 
							private dbSnapshot: DatabaseSnapshotService) {
		this.layout.turnOnTabs();
		this.databaseSummary = null;
		this.currentSalary = 0;
		this.hasLeft = 0;


		this.dbSnapshot.databaseSnapshot.subscribe((snapshot: Database) => {
			console.log('cheguei aqui')
			const todayDate: string = this.utils.transformDateToDatabaseDate(this.utils.todayEndDate);
			try {
				this.currentSalary = Number(snapshot
					.snapshot[todayDate.split('-')[0]]
					[todayDate.split('-')[1]]
					['summary']
					['currentSalary']);
				this.calculateWhatHasLeft();
			} catch(error) {
				console.error('Deu problema ao tentar pegar o salario');
				this.currentSalary = 0;
			}
		});
		this.dbSnapshot.databaseSummary.subscribe((dbSummary: IDatabaseSummary) => {
    	this.databaseSummary = dbSummary;
			this.calculateWhatHasLeft();
		});
	}

	calculateWhatHasLeft(): void {
		if (this.databaseSummary) {
			this.hasLeft = this.currentSalary - 
					this.databaseSummary.currentMonth.totalDebit +
					this.databaseSummary.currentMonth.totalCredit;
		}
	}

	ngOnInit() {
	}

}
