/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { CollectService } from './collect.service';

describe('Service: Collect', () => {
  beforeEach(() => {
    addProviders([CollectService]);
  });

  it('should ...',
    inject([CollectService],
      (service: CollectService) => {
        expect(service).toBeTruthy();
      }));
});
