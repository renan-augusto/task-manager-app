import { TestBed } from '@angular/core/testing';

import { TableColumsService } from './table-colums.service';

describe('TableColumsService', () => {
  let service: TableColumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableColumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
