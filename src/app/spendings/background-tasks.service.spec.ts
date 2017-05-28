import { TestBed, inject } from '@angular/core/testing';

import { BackgroundTasksService } from './background-tasks.service';

xdescribe('BackgroundTasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackgroundTasksService]
    });
  });

  it('should be created', inject([BackgroundTasksService], (service: BackgroundTasksService) => {
    expect(service).toBeTruthy();
  }));
});
