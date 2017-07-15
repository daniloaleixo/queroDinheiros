import { TestBed, inject } from '@angular/core/testing';

import { DatabaseSnapshotService } from './database-snapshot.service';

xdescribe('DatabaseSnapshotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseSnapshotService]
    });
  });

  it('should be created', inject([DatabaseSnapshotService], (service: DatabaseSnapshotService) => {
    expect(service).toBeTruthy();
  }));
});
