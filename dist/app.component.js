"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var angularfire2_1 = require('angularfire2');
require('rxjs/add/operator/debounceTime');
var search_service_1 = require('./services/search.service');
var spice_service_1 = require('./spice/spice.service');
var spice_feed_component_1 = require('./spice/spice-feed.component');
var add_spice_component_1 = require('./spice/add-spice.component');
var loginbutton_component_1 = require('./components/loginbutton.component');
var SpiceApp = (function () {
    function SpiceApp(searchService, spiceService, router, af) {
        this.searchService = searchService;
        this.spiceService = spiceService;
        this.router = router;
        this.af = af;
        this.search = new common_1.Control();
        this.search.valueChanges.debounceTime(250).subscribe(function (search) { return searchService.onSearch(search); });
    }
    SpiceApp.prototype.openAddSpice = function () {
        this.spiceService.setObj(null);
        this.router.navigate(['/addSpice']);
    };
    SpiceApp = __decorate([
        core_1.Component({
            selector: 'spice-app',
            directives: [router_1.ROUTER_DIRECTIVES, loginbutton_component_1.LoginButton],
            providers: [router_1.ROUTER_PROVIDERS, search_service_1.SearchService, spice_service_1.SpiceService],
            template: "\n    <nav class=\"navbar navbar-default navbar-inverse navbar-fixed-top\">\n    <div class=\"container-fluid\">\n        <login-button class=\"pull-right\" style=\"margin-top:8px;\"></login-button>\n        \n        <!-- Brand and toggle get grouped for better mobile display -->\n        <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\" aria-expanded=\"false\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" [routerLink]=\"['/']\"><span style=\"color:#89E894\" class=\"glyphicon glyphicon-grain\" aria-hidden=\"true\"></span> All Spice</a>\n        </div>\n\n        <div class=\"collapse navbar-collapse\" id=\"navbar-collapse\">\n        <ul class=\"nav navbar-nav\">\n            <li><a [routerLink]=\"['/']\">My Feed</a></li>\n            <li *ngIf=\"af.auth | async\" ><a [routerLink]=\"['/','mySpice']\">My Spice</a></li>\n        </ul>\n\n        <ul *ngIf=\"af.auth | async\" class=\"nav navbar-nav navbar-right\" style=\"margin-right:0px;\">\n            <li><a (click)=\"openAddSpice()\"><span style=\"color:#89E894\" class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Add Spice</a></li>\n        </ul>\n\n        <form class=\"navbar-form navbar-right hidden-xs\" role=\"search\" style=\"margin-right:0\">\n          <div class=\"form-group\">\n            <div class=\"input-group\">\n                <div class=\"input-group-addon\">\n                <span style=\"color:#89E894\" class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span>\n                </div>\n                <input [ngFormControl]=\"search\" type=\"text\" class=\"form-control search-input\" placeholder=\"Search\" />\n            </div>\n          </div>\n        </form>\n        </div>\n    </div>\n    </nav>\n    <router-outlet></router-outlet>    \n    "
        }),
        router_1.Routes([
            { path: '/', component: spice_feed_component_1.SpiceFeed },
            { path: '/addSpice', component: add_spice_component_1.AddSpice },
            { path: '/:state', component: spice_feed_component_1.SpiceFeed }
        ]), 
        __metadata('design:paramtypes', [search_service_1.SearchService, spice_service_1.SpiceService, router_1.Router, angularfire2_1.AngularFire])
    ], SpiceApp);
    return SpiceApp;
}());
exports.SpiceApp = SpiceApp;
