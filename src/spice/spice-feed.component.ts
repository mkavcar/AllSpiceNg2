import { Component, OnDestroy } from '@angular/core';
import { Control } from '@angular/common';
import { OnActivate, RouteSegment, RouteTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription }   from 'rxjs/Subscription';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/debounceTime';

import { SpiceService } from './spice.service';
import { SpiceCard } from './spice-card.component';
import { SearchService } from '../services/search.service';
import { Spice } from './spice.model';

@Component({
    selector: 'spice-feed',
    directives: [ SpiceCard ],
    template: `
    <div class="form-group visible-xs-block" style="padding: 10px;margin: 0;background: #5CB85C;">
        <div class="input-group">
            <div class="input-group-addon">
                <span style="color:#89E894" class="glyphicon glyphicon-search" aria-hidden="true"></span>
            </div>
            <input [ngFormControl]="search" type="text" class="form-control search-input" placeholder="Search" style="-webkit-box-shadow:none;box-shadow:none;">
        </div>
    </div>
    <spice-card *ngFor="let spice of spices; trackBy: spice?.$id" [spice]="spice"></spice-card>
    <div *ngIf="!loading && spices.length === 0" class="app-alert app-alert-warning">
        <h4><span class="glyphicon glyphicon-grain"></span> No spice found</h4>
    </div>
    `
})

export class SpiceFeed implements OnActivate, OnDestroy {
    private uid: string;
    loading: boolean = true;
    spices: Array<Spice>;
    searchSub: Subscription;
    inputSub: Subscription;
    authSub: Subscription;
    search = new Control();
    
    constructor(private spiceService: SpiceService, private searchService: SearchService, private routeSegment: RouteSegment, private af:AngularFire) {
        var vm = this;
        
        vm.authSub = vm.af.auth.subscribe(function (user: any) {
            if (vm.routeSegment.getParam('state') && user)
                vm.uid = user.uid;
        });
        
        vm.searchSub = searchService.search$.subscribe(search => {
            spiceService.getAll(vm.uid, search).subscribe(
                spices => vm.spices = spices
            );
        });
        
        vm.inputSub = vm.search.valueChanges.debounceTime(250).subscribe(
            search => searchService.onSearch(search)
        );
    }
        
    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {
        this.loading = true;
        this.spiceService.getAll(this.uid, this.searchService.getLast()).subscribe(
            spices => { 
                this.spices = spices;
                this.loading = false;                 
            }
        );
    }
    
    ngOnDestroy() {
        this.searchSub.unsubscribe();
        this.authSub.unsubscribe();
        this.inputSub.unsubscribe();
    }
}