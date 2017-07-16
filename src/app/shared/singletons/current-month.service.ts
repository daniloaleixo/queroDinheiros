import { Injectable } from '@angular/core';

import { ServerCommService } from '../services/server-comm.service';
import { ISummary } from '../models/summaries.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CurrentMonthService {

  public currentSummary: BehaviorSubject<ISummary>;

  constructor(private serverCommService: ServerCommService) {
  	this.currentSummary = new BehaviorSubject<ISummary>(null);
  	this.currentSummary.publishReplay(1);
  	this.serverCommService.getCurrentSummary()
  	.then((snapshot: ISummary) => {
  		this.currentSummary.next(snapshot);
  	});

  }

}
