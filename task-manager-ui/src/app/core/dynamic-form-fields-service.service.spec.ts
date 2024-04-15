import { TestBed } from '@angular/core/testing';

import { DynamicFormFieldsServiceService } from './dynamic-form-fields.service';

describe('DynamicFormFieldsServiceService', () => {
  let service: DynamicFormFieldsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFormFieldsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
