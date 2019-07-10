import { TestBed } from '@angular/core/testing';

import { DialogueService } from './dialogue.service';

describe('DialogueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogueService = TestBed.get(DialogueService);
    expect(service).toBeTruthy();
  });
});
