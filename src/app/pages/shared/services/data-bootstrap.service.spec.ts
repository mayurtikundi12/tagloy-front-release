import { TestBed } from '@angular/core/testing';

import { DataBootstrapService } from './data-bootstrap.service';

describe('DataBootstrapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataBootstrapService = TestBed.get(DataBootstrapService);
    expect(service).toBeTruthy();
  });
});
