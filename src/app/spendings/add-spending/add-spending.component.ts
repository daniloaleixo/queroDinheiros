import { Component, OnInit } from '@angular/core';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { LayoutService } from '../../shared/layout/layout.service';


import { IMyDpOptions } from 'mydatepicker';
import { UtilsService } from '../../shared/services/utils.service';
import { IAddSpending, IDatepicker, IFormAddSpending } from '../../shared/interfaces';
import { SpendingsService } from '../spendings.service';
import { ServerCommService } from '../../shared/services/server-comm.service';


declare var Materialize: any;

@Component({
  selector: 'app-add-spending',
  templateUrl: './add-spending.component.html',
  styleUrls: ['./add-spending.component.scss'],
  providers: [UtilsService]
})
export class AddSpendingComponent implements OnInit {

  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };

  formData: IFormAddSpending; // Responsible for getting the info from the view
  showLoading: boolean;

	constructor(private layout: LayoutService,
              private utils: UtilsService,
              private serverCommService: ServerCommService,
              private spendingsService: SpendingsService) {
    this.formData = {
      tags: '',
      amount: '',
      description: '',
      date: this.utils.getCurrentDate()
    };
    this.showLoading = false;
    this.layout.turnOnTabs();
  }

  ngOnInit() {
  }

  addSpending() {
    if (this.formData.tags && this.formData.amount) {
      this.showLoading = true;

      this.serverCommService.addSpending(this.formData)
          .then(
              (res) => {
                Materialize.toast(res, 4000, 'center');
                this.clearSpedingsInputs();
                this.showLoading = false;
              },
              (error: Error) => Materialize.toast(error.message, 4000, 'center')
          );
    } else {
      Materialize.toast('Por favor preencha todas as informações', 4000, 'center');
    }
  }


  clearSpedingsInputs(): void {
    Object.keys(this.formData).forEach((info) => this.formData[info] = '');
    this.formData.date = this.utils.getCurrentDate();
  }

}
