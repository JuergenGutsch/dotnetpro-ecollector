/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { KnoledgeTimelineComponent } from './knoledge-timeline.component';

describe('Component: KnoledgeTimeline', () => {
  it('should create an instance', () => {
    let component = new KnoledgeTimelineComponent(null);
    expect(component).toBeTruthy();
  });
});
