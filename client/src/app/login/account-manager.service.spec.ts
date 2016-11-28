/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountManagerService } from './account-manager.service';

describe('Service: AccountManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountManagerService]
    });
  });

  it('should ...', inject([AccountManagerService], (service: AccountManagerService) => {
    expect(service).toBeTruthy();
  }));
});
