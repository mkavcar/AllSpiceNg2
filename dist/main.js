"use strict";
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var angularfire2_1 = require('angularfire2');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
platform_browser_dynamic_1.bootstrap(app_component_1.SpiceApp, [
    router_1.ROUTER_PROVIDERS,
    angularfire2_1.FIREBASE_PROVIDERS,
    angularfire2_1.defaultFirebase('https://amber-heat-8766.firebaseio.com'),
    angularfire2_1.firebaseAuthConfig({
        method: angularfire2_1.AuthMethods.Redirect,
        provider: angularfire2_1.AuthProviders.Google
    }),
    core_1.provide(common_1.APP_BASE_HREF, { useValue: '/' }),
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.PathLocationStrategy })
]);
