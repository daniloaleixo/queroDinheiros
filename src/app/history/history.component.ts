import { Component, OnInit } from '@angular/core';

import { Spending } from '../shared/models/spendings.model';
import { DatabaseSnapshotService } from '../shared/singletons/database-snapshot.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

	public spendingHistory: Array<Spending>;

  constructor(private dbSnapshot: DatabaseSnapshotService) {
  	this.spendingHistory = [];
  	this.dbSnapshot.spendingArrayHistory
  	.filter((array: Spending[]) => array.length > 0)
  	.subscribe((array: Spending[]) => this.spendingHistory = array);
  }

  ngOnInit() {
  }

}
