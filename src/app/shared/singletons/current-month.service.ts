import { Injectable } from '@angular/core';

import { ServerCommService } from '../services/server-comm.service';
import { ISettings } from '../models/interfaces.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CurrentMonthService {

  public currentSummary: BehaviorSubject<ISettings>;

  constructor(private serverCommService: ServerCommService) {
  	this.currentSummary = new BehaviorSubject<ISettings>(null);
  	this.currentSummary.publishReplay(1);
  	this.serverCommService.getCurrentSummary()
  	.then((snapshot: ISettings) => {
  		this.currentSummary.next(snapshot);
  	});

  }

}