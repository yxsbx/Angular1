import { TestBed } from '@angular/core/testing';

import { MoodLogService } from './mood-log.service';

describe('MoodLogService', () => {
  let service: MoodLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
