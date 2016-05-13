import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { AllSpiceNg2AppComponent } from '../app/all-spice-ng2.component';

beforeEachProviders(() => [AllSpiceNg2AppComponent]);

describe('App: AllSpiceNg2', () => {
  it('should create the app',
      inject([AllSpiceNg2AppComponent], (app: AllSpiceNg2AppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'all-spice-ng2 works!\'',
      inject([AllSpiceNg2AppComponent], (app: AllSpiceNg2AppComponent) => {
    expect(app.title).toEqual('all-spice-ng2 works!');
  }));
});
