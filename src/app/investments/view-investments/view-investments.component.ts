import { Component, OnInit } from '@angular/core';

import { LayoutService } from '../../shared/singletons/layout.service';

@Component({
  selector: 'app-view-investments',
  templateUrl: './view-investments.component.html',
  styleUrls: ['./view-investments.component.scss']
})
export class ViewInvestmentsComponent implements OnInit {

  constructor(private layout: LayoutService) {
  	this.layout.turnOnTabs();
  }

  ngOnInit() {
  }

}
