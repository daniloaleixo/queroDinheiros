import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {

	headerText: string;
	headerColor: string;
	buttonColor: string;
  showTabs: boolean;
  showLoading: boolean;

  	constructor() {
  		this.headerColor = '#ee6e73';
    	this.headerText = 'QueroDinheiros';
      this.showTabs = true;
      this.showLoading = false;
  	}

    turnOffLoading(): void {
      this.showLoading = false;
    }

    turnOnLoading(): void {
      this.showLoading = true;
    }


    getLoading(): boolean {
      return this.showLoading;
    }

    getShowTabs(): boolean {
      return this.showTabs;
    }

    turnOnTabs(): void {
      this.showTabs = true;
    }

    turnOffTabs(): void {
      this.showTabs = false;
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
