import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-spending',
  templateUrl: './add-spending.component.html',
  styleUrls: ['./add-spending.component.css']
})
export class AddSpendingComponent implements OnInit {

	  private formData: IFormData;

  	constructor() {}

  	ngOnInit() {
  	}

    addSpending() {
      console.log('addSpending');
    }

}


interface IFormData {
	tags: string[];
	amount: number;
	description: string;
	date: string;
}
