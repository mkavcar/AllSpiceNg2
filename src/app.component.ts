import { Component } from '@angular/core';
import { Control } from '@angular/common';
import { Router, Routes, ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/debounceTime';

import { SearchService } from './services/search.service';
import { SpiceService } from './spice/spice.service';
import { SpiceFeed } from './spice/spice-feed.component';
import { AddSpice } from './spice/add-spice.component';
import { LoginButton } from './components/loginbutton.component';

@Component({
    selector: 'spice-app',
    directives: [ ROUTER_DIRECTIVES, LoginButton ],
    providers: [ ROUTER_PROVIDERS, SearchService, SpiceService ],
    template: `
    <nav class="navbar navbar-default navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <login-button class="pull-right" style="margin-top:8px;"></login-button>
        
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" [routerLink]="['/']"><span style="color:#89E894" class="glyphicon glyphicon-grain" aria-hidden="true"></span> All Spice</a>
        </div>

        <div class="collapse navbar-collapse" id="navbar-collapse">
        <ul class="nav navbar-nav">
            <li><a [routerLink]="['/']">My Feed</a></li>
            <li *ngIf="af.auth | async" ><a [routerLink]="['/','mySpice']">My Spice</a></li>
        </ul>

        <ul *ngIf="af.auth | async" class="nav navbar-nav navbar-right" style="margin-right:0px;">
            <li><a (click)="openAddSpice()"><span style="color:#89E894" class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Spice</a></li>
        </ul>

        <form class="navbar-form navbar-right hidden-xs" role="search" style="margin-right:0">
          <div class="form-group">
            <div class="input-group">
                <div class="input-group-addon">
                <span style="color:#89E894" class="glyphicon glyphicon-search" aria-hidden="true"></span>
                </div>
                <input [ngFormControl]="search" type="text" class="form-control search-input" placeholder="Search" />
            </div>
          </div>
        </form>
        </div>
    </div>
    </nav>
    <router-outlet></router-outlet>    
    `
})

@Routes([
  { path: '/',  component: SpiceFeed },
  { path: '/addSpice', component: AddSpice },
  { path: '/:state',  component: SpiceFeed }  
])

export class SpiceApp {
    search = new Control();
    
    constructor(private searchService: SearchService, private spiceService: SpiceService, public router: Router, public af: AngularFire) {
        this.search.valueChanges.debounceTime(250).subscribe(
            search => searchService.onSearch(search)
        );
    }
    
    openAddSpice() {
        this.spiceService.setObj(null);
        this.router.navigate(['/addSpice']);
    }
}