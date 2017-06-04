import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {

	headerText: string;
	headerColor: string;
	buttonColor: string;

  	constructor() {
  		this.headerColor = '#ee6e73';
    	this.headerText = 'QueroDinheiros';
  	}

  	getHeaderColor(): string {
  		return this.headerColor;
  	}

  	getHeaderText(): string {
  		return this.headerText;
  	}

  	setHeaderText(text: string): void {
  		this.headerText = text;
  	}

  	getButtonColor(): string {
  		return this.buttonColor;
  	}

}
