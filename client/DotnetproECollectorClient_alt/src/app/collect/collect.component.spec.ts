/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CollectComponent } from './collect.component';

describe('Component: Collect', () => {
  it('should create an instance', () => {
    let component = new CollectComponent();
    expect(component).toBeTruthy();
  });
});
