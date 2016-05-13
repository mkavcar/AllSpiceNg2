import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AllSpiceNg2AppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AllSpiceNg2AppComponent);
