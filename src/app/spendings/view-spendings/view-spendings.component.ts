import { Component, OnInit } from '@angular/core';

import { LayoutService } from '../../shared/singletons/layout.service';
import { DatabaseSnapshotService } from '../../shared/singletons/database-snapshot.service';
import { UtilsService } from '../../shared/services/utils.service';

import { Database } from '../../shared/models/database.model';
import { IDatabaseSummary, ISummaryCategorieHash } from '../../shared/models/summaries.model';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-view-spendings',
  templateUrl: './view-spendings.component.html',
  styleUrls: ['./view-spendings.component.scss']
})
export class ViewSpendingsComponent implements OnInit {

	public databaseSummary: IDatabaseSummary;
	public currentSalary: number;
	public hasLeft: number;

	public chartReady = false;

	public pie_ChartData = [];

  public pie_ChartOptions  = {
    title: 'My Daily Activities',
    pieHole: 0.4,
    chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
    legend: { position: 'none'}
  };



	constructor(private layout: LayoutService,
							private utils: UtilsService,
							private dbSnapshot: DatabaseSnapshotService) {
		this.layout.turnOnTabs();
		this.databaseSummary = null;
		this.currentSalary = 0;
		this.hasLeft = 0;



		this.dbSnapshot.databaseSnapshot
		.filter((snapshot: Database) => snapshot.snapshot != null)
		.subscribe((snapshot: Database) => {
			const todayDate: string = this.utils.transformDateToDatabaseDate(this.utils.todayEndDate);
			try {
				this.currentSalary = Number(snapshot
					.snapshot[todayDate.split('-')[0]]
					[todayDate.split('-')[1]]
					['summary']
					['currentSalary']);
				this.calculateWhatHasLeft();
			} catch (error) {
				console.error('Deu problema ao tentar pegar o salario');
				this.currentSalary = 0;
			}
		});
		this.dbSnapshot.databaseSummary.subscribe((dbSummary: IDatabaseSummary) => {
    	this.databaseSummary = dbSummary;
			this.calculateWhatHasLeft();
			this.generateChart();
		});
	}

	calculateWhatHasLeft(): void {
		if (this.databaseSummary) {
			this.hasLeft = this.currentSalary -
					this.databaseSummary.currentMonth.totalDebit +
					this.databaseSummary.currentMonth.totalCredit;
		}
	}

	generateChart() {

		this.pie_ChartData = [
    ['Tag', 'Amount Spent']];

		const currentMonthSpendingsTags: ISummaryCategorieHash =
			this.databaseSummary.currentMonth.spendingPerCategories;

		Object.keys(currentMonthSpendingsTags)
		.filter(tag => currentMonthSpendingsTags[tag] > 0)
		.forEach((tag: string) =>
			this.pie_ChartData.push([tag, currentMonthSpendingsTags[tag]]));
	}

	ngOnInit() {
	}

}
