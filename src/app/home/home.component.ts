import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { List } from '../_models';
import { ListService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    lists: List[];
    
    constructor(private listService: ListService) {}

    ngOnInit() {
        this.listService.getAll().pipe(first()).subscribe(page => { 
            this.lists = page.content; 
            console.log(page);
        });
    }
}