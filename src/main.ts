import { provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthMethods, AuthProviders } from 'angularfire2';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { ROUTER_PROVIDERS } from '@angular/router';
import { SpiceApp } from './app.component';


bootstrap(SpiceApp, [
    ROUTER_PROVIDERS,
    FIREBASE_PROVIDERS,
    defaultFirebase('https://amber-heat-8766.firebaseio.com'),
    firebaseAuthConfig({
        method: AuthMethods.Redirect,
        provider: AuthProviders.Google
    }),
    provide(APP_BASE_HREF, {useValue: '/'}),
    provide(LocationStrategy, { useClass: PathLocationStrategy })
  ]);