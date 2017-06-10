import { Component, OnInit } from '@angular/core';

import { LayoutService } from '../../shared/layout/layout.service';

@Component({
  selector: 'app-view-spendings',
  templateUrl: './view-spendings.component.html',
  styleUrls: ['./view-spendings.component.css']
})
export class ViewSpendingsComponent implements OnInit {

  constructor(private layout: LayoutService) {
  	this.layout.turnOnTabs();
  }

  ngOnInit() {
  }

}
