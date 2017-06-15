import { Component, OnInit } from '@angular/core';

import { LayoutService } from '../../shared/layout/layout.service';
import { ServerCommService } from '../../shared/services/server-comm.service';

@Component({
  selector: 'app-view-spendings',
  templateUrl: './view-spendings.component.html',
  styleUrls: ['./view-spendings.component.css']
})
export class ViewSpendingsComponent implements OnInit {

	spentMonth: number;

  	constructor(private layout: LayoutService,
  				private server: ServerCommService) {
  		this.layout.turnOnTabs();
  		this.spentMonth = 0;
  	}

  	ngOnInit() {
  		this.spentMonth = this.server.calculateMonthlySpent();
  	}

}
