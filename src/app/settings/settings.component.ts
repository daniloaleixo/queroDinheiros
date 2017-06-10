import { Component, OnInit } from '@angular/core';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';

import { LayoutService } from '../shared/layout/layout.service';
import { ServerCommService } from '../shared/services/server-comm.service';

declare var Materialize: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

	salary: number;

  	constructor(private layout: LayoutService,
  				private server: ServerCommService) {
  		this.salary = 500;
  		this.layout.turnOffTabs();
  	}

  	ngOnInit() {
  	}

  	updateSettings(): void {
  		this.server.updateSalary(this.salary)
  		.subscribe(
  		(res) => Materialize.toast('Salário salvo com sucesso', 4000, 'center'),
  		(error) => Materialize.toast('Problema ao salvar salário', 4000, 'center'));
  	}

}
