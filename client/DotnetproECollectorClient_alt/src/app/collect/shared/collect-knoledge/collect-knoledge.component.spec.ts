/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CollectKnoledgeComponent } from './collect-knoledge.component';

describe('Component: CollectKnoledge', () => {
  it('should create an instance', () => {
    let component = new CollectKnoledgeComponent(null);
    expect(component).toBeTruthy();
  });
});
