import { Component, OnInit } from '@angular/core';

import { LayoutService } from '../../shared/layout/layout.service';
import { ServerCommService } from '../../shared/services/server-comm.service';
import { CurrentMonthService } from '../../singletons/current-month.service';
import { ISettings } from '../../shared/interfaces';

@Component({
  selector: 'app-view-spendings',
  templateUrl: './view-spendings.component.html',
  styleUrls: ['./view-spendings.component.css']
})
export class ViewSpendingsComponent implements OnInit {

  summary: ISettings;

	constructor(private layout: LayoutService,
              private currentMonthService: CurrentMonthService,
				      private server: ServerCommService) {
		this.layout.turnOnTabs();
    this.summary = {};
    this.currentMonthService.currentSummary
    .subscribe((summary: ISettings) => this.summary = summary);
	}

	ngOnInit() {
	}

}
