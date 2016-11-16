/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CollectService } from './collect.service';

describe('Service: Collect', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectService]
    });
  });

  it('should ...', inject([CollectService], (service: CollectService) => {
    expect(service).toBeTruthy();
  }));
});
