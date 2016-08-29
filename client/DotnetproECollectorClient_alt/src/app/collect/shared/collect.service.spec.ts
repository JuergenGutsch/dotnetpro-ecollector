/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { CollectService } from './collect.service';

describe('Collect Service', () => {
  beforeEachProviders(() => [CollectService]);

  it('should ...',
      inject([CollectService], (service: CollectService) => {
    expect(service).toBeTruthy();
  }));
});
