import { TestBed, inject } from '@angular/core/testing';

import { SpendingsService } from './spendings.service';

describe('SpendingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpendingsService]
    });
  });

  it('should be created', inject([SpendingsService], (service: SpendingsService) => {
    expect(service).toBeTruthy();
  }));
});
