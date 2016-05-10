import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchService {
    private lastSearch: string; 
    private searchSource = new Subject<string>();
    search$ = this.searchSource.asObservable();
    
    onSearch(search: string) {
        this.lastSearch = search;
        this.searchSource.next(search);
    }
    
    getLast() {
        return this.lastSearch;
    }
}