import { Component, OnInit } from '@angular/core';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../../auth/auth.service';
import { IMyDpOptions } from 'mydatepicker';
import { IDatepicker, UtilsService } from '../../shared/services/utils.service';
import { BackgroundTasksService } from '../background-tasks.service';


declare var Materialize: any;

@Component({
  selector: 'app-add-spending',
  templateUrl: './add-spending.component.html',
  styleUrls: ['./add-spending.component.css'],
  providers: [UtilsService, BackgroundTasksService]
})
export class AddSpendingComponent implements OnInit {

    myDatePickerOptions: IMyDpOptions = {
      // other options...
      dateFormat: 'dd-mm-yyyy',
    };

	  formData: any;
    sendData: IAddSpending;
    showLoading: boolean;

    private year: string;
    private month: string;
    private day: string;

  	constructor(private db: AngularFireDatabase,
                private auth: AuthService,
                private utils: UtilsService,
                private backgroundTasksService: BackgroundTasksService) {
      this.formData = {
        tags: '',
        amount: '',
        description: '',
        date: this.utils.getCurrentDate()
      };
      this.showLoading = false;
      this.sendData = { tags: [''], amount: 0, description: '', date: '' };
    }

    ngOnInit() {
    }

    addSpending() {
      this.showLoading = true;
      this.sendData.tags = this.formData.tags;
      this.sendData.amount = this.validateAmount(this.formData.amount);
      this.sendData.description = this.validateDescription(this.formData.description);
      this.sendData.date = this.validateDate(this.formData.date);

      if (this.sendData.tags && this.sendData.amount && this.sendData.date) {

        console.log('enviar pro server', this.sendData);
        // Wait to system to login and then get the database
        this.auth.uid.subscribe((uid: string) => {
          // First I have to get all the objects from server that I will need
          //  And I need the summary of the day, month and year
          // To add the new value to those infos
          if (uid) {
            const debtsList: FirebaseListObservable<any> =
            this.db.list(`${uid}/${this.year}/${this.month}/${this.day}/debts/`);

            // Send te spending to Firebase
            const sendSpendingToServer = debtsList.push(this.sendData)
            .then(
                (res) => {
                  Materialize.toast('Gasto salvo com sucesso', 4000, 'center');
                  // This backgroung service will sum the value in all
                  // summaries (day, month and year) and update the new info
                  this.backgroundTasksService
                    .updateSummary(uid, this.year, this.month, this.day, this.sendData);
                },
                (error: Error) => Materialize.toast(error.message, 4000, 'center')
            );
          }
        });
      } else {
        Materialize.toast('Por favor preencha todas as informações', 4000, 'center');
      }

      this.clearSpedingsInputs();
      this.showLoading = false;
    }


    validateTags(tags): string[] {
      const tagsArray = tags.split(' ');
      if (tagsArray.length > 0) return tagsArray;
      return [];
    }

    validateAmount(amount): number {
      // amount.replace(/,/g, '.');
      return parseFloat(amount);
    }

    validateDescription(description): string {
        if (description.length === 0) return 'null';
        return description;
    }

    validateDate(date: IDatepicker): string {
     this.day = date.date.day.toString();
     if (date.date.month < 10) this.month = '0' + date.date.month.toString();
     else this.month = date.date.month.toString();
     this.year = date.date.year.toString();

     return this.day + '-' + this.month + '-' + this.year;
    }


    clearSpedingsInputs(): void {
      Object.keys(this.formData).forEach((info) => this.formData[info] = '');
      Object.keys(this.sendData).forEach((info) => this.sendData[info] = '');
    }

}

export interface IAddSpending {
  tags: string[];
  amount: number;
  description: string;
  date: string;
}
