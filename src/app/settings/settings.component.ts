import { Component, OnInit } from '@angular/core';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';

import { LayoutService } from '../shared/singletons/layout.service';
import { ServerCommService } from '../shared/services/server-comm.service';

import { ParentComponent } from '../shared/models/parent-component.model';

declare var Materialize: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [ServerCommService]
})
export class SettingsComponent extends ParentComponent implements OnInit {

	salary: number;

	constructor(private layout: LayoutService,
				private server: ServerCommService) {
    super();
		this.salary = 500;
		this.layout.turnOffTabs();
	}

	ngOnInit() {
	}

	updateSettings(): void {
    this.showLoading = true;
		this.server.updateSalary(this.salary)
		.subscribe(
		(res) => Materialize.toast('Salário salvo com sucesso', 4000, 'center'),
		(error) => Materialize.toast('Problema ao salvar salário', 4000, 'center'),
    () => this.showLoading = false);
	}

}
